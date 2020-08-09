// 3p
// import { Group, Permission } from '@foal/typeorm';
// import { isCommon } from '@foal/password';
import {
  createConnection,
  getConnection,
  // getManager /*getRepository*/,
} from 'typeorm';

// App
import { CreateUserDto } from '../app/plugins/user/user.dto';
import { UserService } from '../app/plugins/user/user.service';
import { createService } from '@foal/core';
// import { validate, validateOrReject } from 'class-validator';
// import { plainToClass } from 'class-transformer';
// import { User } from '../app/plugins/user/entities';

export async function main(args: CreateUserDto) {
  await createConnection();

  // for (const codeName of args.userPermissions as string[]) {
  //   const permission = await getRepository(Permission).findOne({ codeName });
  //   if (!permission) {
  //     console.log(`No permission with the code name "${codeName}" was found.`);
  //     return;
  //   }
  //   user.userPermissions.push(permission);
  // }

  // for (const codeName of args.groups as string[]) {
  //   const group = await getRepository(Group).findOne({ codeName });
  //   if (!group) {
  //     console.log(`No group with the code name "${codeName}" was found.`);
  //     return;
  //   }
  //   user.groups.push(group);
  // }

  try {
    // console.log(await getManager().save(user));
    const userService = createService(UserService);
    await userService.createOne(args);
  } catch (error) {
    console.log(error);
  } finally {
    await getConnection().close();
  }
}
