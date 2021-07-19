const db = require('../models');
import Joi from 'joi'

export const saveSubscription = async (req, res) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                price: Joi.string().required(),
                duration_months: Joi.string().required()
            });

            const validation = schema.validate(req.body);
            if (validation.error) {
                return res.status(400).send(validation.error)
            }

            await db.subscriptions.create(req.body);
        return res.status(201).send({});
    } catch (e) {
        console.log(e);
        return res.status(400).send(e.errors ?? { message: 'unexpected error' });
    }
};

export const listSubscriptions = async (req, res) => {
    try {
        const subscriptions = await db.subscriptions.findAll({});
    
        return res.send(subscriptions);
      } catch (e) {
        console.log(e);
        return res.status(400).send(e.errors ?? { message: 'unexpected error' });
      }
};

export const subscribeUser = async (req, res) => {
    const { userId } = req.params;
    const { subscriptionId } = req.params;

    const subscription = await db.subscriptions.findByPk(Number(subscriptionId));

    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + subscription.duration_months);

    await db.user_subscriptions.create({
        user_id: userId,
        subscription_id: subscriptionId,
        start_date: new Date(),
        end_date: endDate,
      })

      return res.send(subscription);

};
