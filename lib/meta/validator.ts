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
    console.log(error);
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
  console.log('missing', missing, missingKeys);

  const valueErrors = errors.filter(e => e.error === 'value') as ValueErrorWithField[];
  let errorDesc = '遇到以下错误: \n';
  if (missing.length) {
    errorDesc += `\t缺少以下字段: ${missing.join(', ')}\n`;
  }
  if (valueErrors.length) {
    errorDesc += '\t以下字段的值不符合要求:\n';
    errorDesc += valueErrors.map(e => `\t\t${e.field}: 可以填写的值为 ${e.validValues.join(' | ')}`).join('\n');
  }
  if (formatErrors.length) {
    errorDesc += '\t以下字段的值格式错误:\n';
    errorDesc += formatErrors
      .map(e => `\t\t${e.field}: 可以填写的格式为 ${e.formats.map((f, i) => `\t\t\t${i + 1}: ${f}`).join('\n')}`)
      .join('\n');
  }
  errorDesc + '\n';
  throw new MetaError('元数据验证错误，打开控制台查看完整信息', errorDesc);
}

export const Validator: Record<UploadType, (meta: any) => void | Promise<void>> = {
  article: (meta: Omit<ArticleMeta, 'type'>) => {
    console.log(meta);
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
            validValues: ['长度大于 0 的字符串'],
          };
        }
        return null;
      },
      keywords(value) {
        if (!Array.isArray(value) || value.find(e => typeof e !== 'string') !== undefined) {
          return {
            error: 'value',
            validValues: ['字符串数组'],
          };
        }
        return null;
      },
      title(value) {
        if (typeof value !== 'string' || value.length === 0) {
          return {
            error: 'value',
            validValues: ['长度大于 0 的字符串'],
          };
        }
        return null;
      },
    });
    throw new Error('目前尚未支持上传 article');
  },
  news: (meta: Omit<NewsMeta, 'type'>) => {
    checkMeta(meta, {
      title(value) {
        if (typeof value !== 'string' || value.length === 0) {
          return {
            error: 'value',
            validValues: ['长度大于 0 的字符串'],
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
              validValues: ['图片链接'],
            };
          }
          if (/^https?:\/\//.test(value)) {
            return null;
          }
          return {
            error: 'format',
            formats: ['图片链接 (http或https)'],
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
            validValues: ['长度大于 0 的字符串'],
          };
        }
        return null;
      },
      order(value) {
        if (typeof value !== 'number') {
          return {
            error: 'value',
            validValues: ['任意数字'],
          };
        }
        return null;
      },
    });
  },
};
