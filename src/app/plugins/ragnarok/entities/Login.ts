import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('web_auth_token_key', ['webAuthToken'], { unique: true })
@Index('name', ['userid'], {})
@Entity('login')
export class Login {
  @PrimaryGeneratedColumn({ type: 'int', name: 'account_id', unsigned: true })
  accountId: number;

  @Column('varchar', { name: 'userid', length: 23, default: () => '' })
  userid: string;

  @Column('varchar', { name: 'user_pass', length: 32, default: () => '' })
  userPass: string;

  @Column('enum', { name: 'sex', enum: ['M', 'F', 'S'], default: () => 'M' })
  sex: 'M' | 'F' | 'S';

  @Column('varchar', { name: 'email', length: 39, default: () => '' })
  email: string;

  @Column('tinyint', { name: 'group_id', default: () => '0' })
  groupId: number;

  @Column('int', { name: 'state', unsigned: true, default: () => '0' })
  state: number;

  @Column('int', { name: 'unban_time', unsigned: true, default: () => '0' })
  unbanTime: number;

  @Column('int', {
    name: 'expiration_time',
    unsigned: true,
    default: () => '0',
  })
  expirationTime: number;

  @Column('mediumint', {
    name: 'logincount',
    unsigned: true,
    default: () => '0',
  })
  logincount: number;

  @Column('datetime', { name: 'lastlogin', nullable: true })
  lastlogin: Date | null;

  @Column('varchar', { name: 'last_ip', length: 100, default: () => '' })
  lastIp: string;

  @Column('date', { name: 'birthdate', nullable: true })
  birthdate: string | null;

  @Column('tinyint', {
    name: 'character_slots',
    unsigned: true,
    default: () => '0',
  })
  characterSlots: number;

  @Column('varchar', { name: 'pincode', length: 4, default: () => '' })
  pincode: string;

  @Column('int', {
    name: 'pincode_change',
    unsigned: true,
    default: () => '0',
  })
  pincodeChange: number;

  @Column('int', { name: 'vip_time', unsigned: true, default: () => '0' })
  vipTime: number;

  @Column('tinyint', { name: 'old_group', default: () => '0' })
  oldGroup: number;

  @Column('varchar', {
    name: 'web_auth_token',
    nullable: true,
    unique: true,
    length: 17,
  })
  webAuthToken: string | null;

  @Column('tinyint', { name: 'web_auth_token_enabled', default: () => '0' })
  webAuthTokenEnabled: number;
}
