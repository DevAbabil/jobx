import bcryptjs from 'bcryptjs';
import { Role } from '@/app/modules/user/interface';
import { User } from '@/app/modules/user/model';
import { ENV } from '@/config';

const userData = {
  name: ENV.ROOT_ADMIN_NAME,
  email: ENV.ROOT_ADMIN_GMAIL,
  password: ENV.ROOT_ADMIN_PASSWORD,
  role: Role.SUPPER_ADMIN,
};

export const runSeed = async () => {
  const user = await User.findOne({ email: userData.email });

  const hashPassword = bcryptjs.hashSync(
    userData.password,
    bcryptjs.genSaltSync(10)
  );

  if (!user) {
    await User.create({
      name: userData.name,
      email: userData.email,
      password: hashPassword,
      role: Role.SUPPER_ADMIN,
    });
    console.log('SUPPER_ADMIN created!');
  } else {
    await User.findByIdAndUpdate(
      user.id,
      {
        name: userData.name,
        email: userData.email,
        password: hashPassword,
        role: Role.SUPPER_ADMIN,
      },
      { runValidators: true }
    );
    console.log('SUPPER_ADMIN updated!');
  }
};
