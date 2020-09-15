const Order = require('../Models/order.model.js');

//Create new Order
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Order content can not be empty"
        });
    }

    // Create a Order
    const order = new Order({
        customer_id: req.body.customer_id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        user_name: req.body.user_name,
        email: req.body.email,
        is_delivery: req.body.is_delivery,
        delivery_fee: req.body.delivery_fee,
        delivery_instructions: req.body.delivery_instructions,
        destination: req.body.destination,
        shipping_address: req.body.shipping_address,
        location: req.body.location,
        shipping_company: req.body.shipping_company,
        shipping_company: req.body.shipping_company,
        shipping_company_name: req.body.shipping_company_name,
        shipping_company_contact: req.body.shipping_company_contact,
        shipping_company_address: req.body.shipping_company_address,
        cart_items: req.body.cart_items,
        shipping_method: req.body.shipping_method,
        payment_method: req.body.payment_method,
        stage: req.body.stage,
        currency_id: req.body.currency_id,
        shipping_zone_id: req.body.shipping_zone_id,
        payment_zone_id: req.body.payment_zone_id,
        shipping_country_id: req.body.shipping_country_id,
        payment_country_id: req.body.payment_country_id,
        invoice_no: req.body.invoice_no,
        invoice_prefix: req.body.invoice_prefix,
        order_prefix_id: req.body.order_prefix_id,
        commision: req.body.commision,
        sub_total: req.body.sub_total,
        total: req.body.total,
        reward: req.body.reward,
        discount: req.body.discount,
        rate: req.body.rate,
        currency_code: req.body.currency_code,
        currency_value: req.body.currency_value,
        credits_used: req.body.credits_used,
        discounted_subtotal: req.body.discounted_subtotal,
        contact: req.body.contact,
        created_by: req.body.created_by,
        modified_by: req.body.modified_by,
        created_date: req.body.created_date,
        modified_date: req.body.modified_date,
        status: req.body.status,
        promo_code: req.body.promo_code,
        shop_contact: req.body.shop_contact,
        shop_email: req.body.shop_email,
        shop_address: req.body.shop_address,
        comment: req.body.comment,
        affiliate_id: req.body.affiliate_id,
        ip: req.body.ip,
        order_number: req.body.order_number,
    });

    // Save Order in the database
    order.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the order."
            });
        });
};

// Retrieve all orders from the database.
exports.findAll = (req, res) => {
    Order.find()
        .then(orders => {
            res.send(orders);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving orders."
            });
        });
};

// Find a single order with a orderId
exports.findOne = (req, res) => {
    Order.findById(req.params.orderId)
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.orderId
                });
            }
            res.send(order);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.orderId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving order with id " + req.params.orderId
            });
        });
};

// Update a order
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Order content can not be empty"
        });
    }

    // Find and update order with the request body
    Order.findByIdAndUpdate(req.params.orderId, {
        customer_id: req.body.customer_id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        user_name: req.body.user_name,
        email: req.body.email,
        is_delivery: req.body.is_delivery,
        delivery_fee: req.body.delivery_fee,
        delivery_instructions: req.body.delivery_instructions,
        destination: req.body.destination,
        shipping_address: req.body.shipping_address,
        location: req.body.location,
        shipping_company: req.body.shipping_company,
        shipping_company: req.body.shipping_company,
        shipping_company_name: req.body.shipping_company_name,
        shipping_company_contact: req.body.shipping_company_contact,
        shipping_company_address: req.body.shipping_company_address,
        cart_items: req.body.cart_items,
        shipping_method: req.body.shipping_method,
        payment_method: req.body.payment_method,
        stage: req.body.stage,
        currency_id: req.body.currency_id,
        shipping_zone_id: req.body.shipping_zone_id,
        payment_zone_id: req.body.payment_zone_id,
        shipping_country_id: req.body.shipping_country_id,
        payment_country_id: req.body.payment_country_id,
        invoice_no: req.body.invoice_no,
        invoice_prefix: req.body.invoice_prefix,
        order_prefix_id: req.body.order_prefix_id,
        commision: req.body.commision,
        sub_total: req.body.sub_total,
        total: req.body.total,
        reward: req.body.reward,
        discount: req.body.discount,
        rate: req.body.rate,
        currency_code: req.body.currency_code,
        currency_value: req.body.currency_value,
        credits_used: req.body.credits_used,
        discounted_subtotal: req.body.discounted_subtotal,
        contact: req.body.contact,
        created_by: req.body.created_by,
        modified_by: req.body.modified_by,
        created_date: req.body.created_date,
        modified_date: req.body.modified_date,
        status: req.body.status,
        promo_code: req.body.promo_code,
        shop_contact: req.body.shop_contact,
        shop_email: req.body.shop_email,
        shop_address: req.body.shop_address,
        comment: req.body.comment,
        affiliate_id: req.body.affiliate_id,
        ip: req.body.ip,
        order_number: req.body.order_number,
    }, { new: true })
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.orderId
                });
            }
            res.send(order);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.orderId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.orderId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Order.findByIdAndRemove(req.params.orderId)
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.orderId
                });
            }
            res.send({ message: "Order deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.orderId
                });
            }
            return res.status(500).send({
                message: "Could not delete order with id " + req.params.orderId
            });
        });
};


