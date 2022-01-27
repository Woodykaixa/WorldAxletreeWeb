import { BadRequest } from '@/lib/error';
import { ParamParser, DefaultParser } from './defaultParsers';

type SchemaType<HttpParamType extends object = {}> = {
  [key in keyof HttpParamType]: ParamParser<HttpParamType[key]>;
};

export async function parseParam<HttpParamType extends object>(
  param: any,
  schema: SchemaType<HttpParamType>,
  optionalFields?: Array<Extract<keyof HttpParamType, string>>
): Promise<HttpParamType> {
  const typedParam = param as HttpParamType;
  const expected = Object.keys(schema);
  const unparsedKeys = new Set(expected);
  const result = {} as HttpParamType;
  for (const key in typedParam) {
    if (!expected.includes(key)) {
      continue;
    }
    const value = typedParam[key];
    const parser = schema[key];
    const { valid, parsed } = await parser(value);
    if (!valid) {
      throw new BadRequest(`param error: ${key}`);
    }
    unparsedKeys.delete(key);
    result[key] = parsed;
  }
  optionalFields?.forEach(f => {
    unparsedKeys.delete(f);
  });
  if (unparsedKeys.size) {
    const keys = [] as string[];
    unparsedKeys.forEach(v => {
      keys.push(v);
    });
    throw new BadRequest(`expect this args: ${keys.join(', ')}`);
  }

  return result;
}

parseParam.parser = DefaultParser;
