import { Request, Response } from 'express';
import { ILoginMethods } from '../interfaces/ILoginMethods';

export default class LoginController {
  constructor(private _service: ILoginMethods) { }

  async login(req: Request, res: Response): Promise<Response | void> {
    const { email, password } = req.body;
    const result = await this._service.login(email, password);

    if (result?.code === 404 || result.code === 401) {
      return res.status(result.code).json({ message: result.message });
    }

    res.status(200).json(result);
  }
}
