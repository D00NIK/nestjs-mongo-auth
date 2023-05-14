import { PassportSerializer } from '@nestjs/passport';
import { Types } from 'mongoose';
import { UsersService } from 'src/users/services/users/users.service';

export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UsersService) {
    super();
  }

  serializeUser(_id: Types.ObjectId, done: (err, _id: Types.ObjectId) => void) {
    done(null, _id);
  }

  async deserializeUser(
    _id: Types.ObjectId,
    done: (err, _id: Types.ObjectId) => void,
  ) {
    const userDB = await this.userService.getUserByObjectId(_id);

    return userDB ? done(null, _id) : done(null, null);
  }
}
