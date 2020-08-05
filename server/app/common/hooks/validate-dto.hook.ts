import { Class } from '@foal/core';
import { ValidateBody } from '@foal/typestack';

export function ValidateDto(cls: Class) {
  return ValidateBody(cls, {
    validator: {
      whitelist: true,
      skipMissingProperties: true,
      forbidUnknownValues: true,
      validationError: { target: false },
    },
  });
}
