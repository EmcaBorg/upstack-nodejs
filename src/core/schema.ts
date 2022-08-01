import Joi from 'joi';

export default { 
  employeesPOST: Joi.object().keys({ 
    name: Joi.string().required(), 
    email: Joi.string().required().email(),
    username: Joi.string().required(),  
    roleId: Joi.number().required()
  }),
  rolesPOST: Joi.object().keys({ 
    roleCode: Joi.string().required(), 
    roleName: Joi.string().required()
  }),
}; 