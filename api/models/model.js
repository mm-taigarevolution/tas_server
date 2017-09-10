'use strict';
var mongoose = require('mongoose'),
inheritFrom = require('mongoose-extend-schema'),
autoIncrement = require('mongoose-auto-increment'),
Schema = mongoose.Schema;

var BaseSchema = new Schema(
{
  created: 
  {
    type: Date,
    default: Date.now
  },
  updated: 
  {
    type: Date,
    default: Date.now
  }
}, { collection : 'schemas', discriminatorKey : '_type' });

var BaseInfoSchema = inheritFrom(BaseSchema, 
{
  description: 
  {
    type: String,
    required: true
  },
  visible: 
  {
    type: [{
      type: String,
      enum: ['on', 'off']
    }],
    default: ['on']
  },
});

var UserSchema = inheritFrom(BaseSchema, 
{
  name: 
  {
    type: String,
    required: true
  },
  status: 
  {
    type: [{
      type: String,
      enum: ['unblocked', 'blocked']
    }],
    default: ['unblocked']
  },
  external_id:
  {
    type: String,
    default: ''
  },
  email_address:
  {
    type: String,
    required: true
  },
  authentication_method: 
  {
    type: [{
      type: String,
      enum: ['facebook', 'google']
    }],
    default: ['google']
  }
});
UserSchema.plugin(autoIncrement.plugin, { model: 'UserSchema', field: 'user_id' });

var DeliveryTermSchema = inheritFrom(BaseInfoSchema,{});
DeliveryTermSchema.plugin(autoIncrement.plugin, { model: 'DeliveryTermSchema', field: 'term_id' });

var ItemLocationSchema = inheritFrom(BaseInfoSchema,{});
ItemLocationSchema.plugin(autoIncrement.plugin, { model: 'ItemLocationSchema', field: 'item_location_id' });

var PaymentMethodSchema = inheritFrom(BaseInfoSchema,{});
PaymentMethodSchema.plugin(autoIncrement.plugin, { model: 'PaymentMethodSchema', field: 'payment_method_id' });

var ContactInfoSchema = inheritFrom(BaseInfoSchema, 
{
  name: 
  {
    type: String,
    required: true
  },
  email_address: 
  {
    type: String,
    required: true
  },
  phone_number: 
  {
    type: String,
    required: true
  }
});
ContactInfoSchema.plugin(autoIncrement.plugin, { model: 'ContactInfoSchema', field: 'contact_info_id' });

var RoleSchema = inheritFrom(BaseSchema, 
{
  role: 
  {
    type: [{
      type: String,
      enum: ['user', 'admin', 'superadmin']
    }],
    required: true
  },
  userid:
  {
    type: Number,
    required: true
  },
});

var AuctionItemSchema = inheritFrom(BaseSchema, 
{
  status: 
  {
    type: [{
      type: String,
      enum: ['inactive','active', 'ended', 'cancelled']
    }],
    default: ['inactive']
  },
  title:
  {
    type: String,
    required: true
  },
  description:
  {
    type: String,
    required: true
  },
  ground_price:
  {
    type: Number,
    required: true
  },
  minimum_offer_raise:
  {
    type: Number,
    required: true
  },
  auction_start:
  {
    type: Date,
    required: true
  },
  auction_end:
  {
    type: Date,
    required: true
  },
  item_location_id:
  {
    type: Number,
    required: true
  },
  contact_info_id:
  {
    type: Number,
    required: true
  },
  payment_method_id:
  {
    type: Number,
    required: true
  },   
  delivery_term_id:
  {
    type: Number,
    required: true
  }      
});
AuctionItemSchema.plugin(autoIncrement.plugin, { model: 'AuctionItemSchema', field: 'auction_item_id' });

var AuctionSchema = inheritFrom(BaseSchema, 
{
  auction_item_id:
  {
    type: Number,
    required: true
  },
  userid:
  {
    type: Number,
    required: true
  },
  offer:
  {
    type: Number,
    required: true
  }
});

var ImageSchema = inheritFrom(BaseSchema, 
{
  auction_item_id:
  {
    type: Number,
    required: true
  },
  url:
  {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('user', UserSchema);
module.exports = mongoose.model('delivery_term', DeliveryTermSchema);
module.exports = mongoose.model('item_location', ItemLocationSchema);
module.exports = mongoose.model('payment_method', PaymentMethodSchema);
module.exports = mongoose.model('contact_info', ContactInfoSchema);
module.exports = mongoose.model('role', RoleSchema);
module.exports = mongoose.model('auction_item', AuctionItemSchema);
module.exports = mongoose.model('auction', AuctionSchema);
module.exports = mongoose.model('image', ImageSchema);


