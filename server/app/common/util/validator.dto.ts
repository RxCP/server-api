import { Class } from '@foal/core';
import { ValidateBody } from '@foal/typestack';

export function ValidateDto(DTO: Class) {
  return ValidateBody(DTO, {
    validator: { validationError: { target: false } },
  });
}
