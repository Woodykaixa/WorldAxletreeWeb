import { Wiki } from '@/dto';
import { MetaError, MissingFieldError, FieldTypeError } from './meta-error';
import { UploadType, UploadTypes, NewsMeta, WikiMeta, ModifiableMetaActions, WikiMetaTypes, ArticleMeta } from './type';

type WithField<T> = T & {
  field: string;
};

type ValueError = {
  error: 'value';
  validValues: string[];
};
type ValueErrorWithField = WithField<ValueError>;

type FormatError = {
  error: 'format';
  formats: string[];
};
type FormatErrorWithField = WithField<FormatError>;

type ValidationError = ValueError | FormatError;

type FieldValidationErrorWithField = ValueErrorWithField | FormatErrorWithField;

type CheckFieldValidator<TMeta extends object, TField extends keyof TMeta> = (
  value: TMeta[TField]
) => null | ValidationError;

type CheckFieldSchema<TMeta extends object, TField extends keyof TMeta> = {
  [key in TField]:
    | CheckFieldValidator<TMeta, TField>
    | {
        optional: true;
        validator: CheckFieldValidator<TMeta, TField>;
      };
};

function checkMeta<TMeta extends object, TSchema extends CheckFieldSchema<TMeta, keyof TMeta>>(
  meta: TMeta,
  schema: TSchema
) {
  const errors = [] as FieldValidationErrorWithField[];
  const entries = Object.keys(schema) as Array<Exclude<keyof TMeta, number | symbol>>;
  const missingKeys = new Set<string>(Object.keys(schema));
  entries.forEach(key => {
    const options = schema[key];
    let validator: CheckFieldValidator<TMeta, keyof TMeta>;
    if (typeof options === 'object') {
      if (options.optional) {
        missingKeys.delete(key);
        validator = options.validator;
      }
    } else {
      validator = options;
    }
    const value = meta[key];
    if (value == undefined) {
      return;
    }
    missingKeys.delete(key);
    const error = validator!(value);
    if (error) {
      errors.push({
        ...error,
        field: key,
      });
    }
  });
  const missing: string[] = [...missingKeys.keys()];

  if (errors.length === 0 && missing.length === 0) {
    return;
  }
  const formatErrors = errors.filter(e => e.error === 'format') as FormatErrorWithField[];

  const valueErrors = errors.filter(e => e.error === 'value') as ValueErrorWithField[];
  let errorDesc = '??????????????????: \n';
  if (missing.length) {
    errorDesc += `\t??????????????????: ${missing.join(', ')}\n`;
  }
  if (valueErrors.length) {
    errorDesc += '\t?????????????????????????????????:\n';
    errorDesc += valueErrors.map(e => `\t\t${e.field}: ????????????????????? ${e.validValues.join(' | ')}`).join('\n');
  }
  if (formatErrors.length) {
    errorDesc += '\t??????????????????????????????:\n';
    errorDesc += formatErrors
      .map(e => `\t\t${e.field}: ???????????????????????? ${e.formats.map((f, i) => `\t\t\t${i + 1}: ${f}`).join('\n')}`)
      .join('\n');
  }
  errorDesc + '\n';
  throw new MetaError('?????????????????????????????????????????????????????????', errorDesc);
}

export const Validator: Record<UploadType, (meta: any) => void | Promise<void>> = {
  article: (meta: Omit<ArticleMeta, 'type'>) => {
    checkMeta(meta, {
      action: {
        optional: true,
        validator(value) {
          if (value === undefined) {
            return null;
          }
          if (typeof value !== 'string' || !ModifiableMetaActions.includes(value as any)) {
            return {
              error: 'value',
              validValues: ModifiableMetaActions as any,
            };
          }
          return null;
        },
      },
      author(value) {
        if (typeof value !== 'string' || value.length === 0) {
          return {
            error: 'value',
            validValues: ['???????????? 0 ????????????'],
          };
        }
        return null;
      },
      keywords(value) {
        if (!Array.isArray(value) || value.find(e => typeof e !== 'string') !== undefined) {
          return {
            error: 'value',
            validValues: ['???????????????'],
          };
        }
        return null;
      },
      title(value) {
        if (typeof value !== 'string' || value.length === 0) {
          return {
            error: 'value',
            validValues: ['???????????? 0 ????????????'],
          };
        }
        return null;
      },
    });
  },
  news: (meta: Omit<NewsMeta, 'type'>) => {
    checkMeta(meta, {
      title(value) {
        if (typeof value !== 'string' || value.length === 0) {
          return {
            error: 'value',
            validValues: ['???????????? 0 ????????????'],
          };
        }
        return null;
      },
      cover: {
        optional: true,
        validator(value) {
          if (typeof value !== 'string') {
            return {
              error: 'value',
              validValues: ['????????????'],
            };
          }
          if (/^https?:\/\//.test(value)) {
            return null;
          }
          return {
            error: 'format',
            formats: ['???????????? (http???https)'],
          };
        },
      },
    });
  },
  notice() {},
  wiki: (meta: Omit<WikiMeta, 'type'>) => {
    checkMeta(meta, {
      action: {
        optional: true,
        validator(value) {
          if (value === undefined) {
            return null;
          }
          if (typeof value !== 'string' || !ModifiableMetaActions.includes(value as any)) {
            return {
              error: 'value',
              validValues: ModifiableMetaActions as any,
            };
          }
          return null;
        },
      },
      kind(value) {
        if (typeof value !== 'string' || !WikiMetaTypes.includes(value as any)) {
          return {
            error: 'value',
            validValues: WikiMetaTypes as any,
          };
        }
        return null;
      },
      side(value) {
        if (typeof value !== 'string' || !Wiki.AllSides.includes(value as any)) {
          return {
            error: 'value',
            validValues: Wiki.AllSides as any,
          };
        }
        return null;
      },
      title(value) {
        if (typeof value !== 'string' || value.length === 0) {
          return {
            error: 'value',
            validValues: ['???????????? 0 ????????????'],
          };
        }
        return null;
      },
      order(value) {
        if (typeof value !== 'number') {
          return {
            error: 'value',
            validValues: ['????????????'],
          };
        }
        return null;
      },
    });
  },
};
