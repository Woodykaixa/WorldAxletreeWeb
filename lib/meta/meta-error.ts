export class MetaError extends Error {
  constructor(name: string, message: string) {
    super(message);
    this.name = name;
  }
}

export class MissingFieldError extends MetaError {
  constructor(field: string[]) {
    super('元数据缺少字段', field.join(', '));
  }
}

export class FieldTypeError extends MetaError {
  constructor(field: string, expect: string[]) {
    super(`元数据 ${field} 字段类型错误`, '应声明以下类型: ' + expect.join(' | '));
  }
}

export class FieldFormatError extends MetaError {
  constructor(field: string, format: string[]) {
    super(`元数据 ${field} 字段格式错误`, '应为以下格式: ' + format.join(' | '));
  }
}
