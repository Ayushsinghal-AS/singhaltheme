<template>
  <transition name="modal" mode="out-in">
    <modal
      :isOpen="isOpen"
      v-on:closedialog="closeDailog"
      :modalClass="'sizeCartModal'"
    >
    <div
        class="size-container"
        v-if="context && context.bag_data && context.bag_data.items"  
    >
      <fdk-cart class="cart">
        <template slot-scope="cart">
          <template>
            <div class="cart-heading" style="flex: 0 0 100%">
              <div class="cart__title">
                <p>Cart Preview ( {{ context.bag_data.items.length }} )</p>
              </div>
            </div>
            <div class="scroll">
            <div v-for="(item, index) in context.bag_data.items" :key="index" class="leftcart">
              <div class="left">
                <div class="cart__items">
                  <fdk-link :link="`/product/${item.product.slug}`">
                    <img class="imgClass" :src="item.product.images[0].url"
                    />
                  </fdk-link>
                </div>
              </div>
              <div class="bag-right">
                <div>
                  <div
                    class="bag-brand bold-sm" 
                  >
                    <fdk-link :link="`/product/${item.product.slug}`">
                    {{ item.product.name }}
                    </fdk-link>
                  </div>
                  <div
                    class="bag-variant bold-sm" 
                  >
                    {{ getColorName(item.product.name) }}
                  </div>
                  <div class="bag-name">
                    {{ context.bag_data.currency.symbol }} 
                    {{ getItemPrice(item) }}
                  </div>
                </div>
                <div class="right-items">
                  <div class="quantity-container">
                    <div class="quantity">
                      <quantity-ctrl
                        :currquantity="item.quantity"
                        :total="item.article.quantity"
                        v-on:update-quantity-error="updateError"
                        v-on:inc-quantity="
                          updateCart($event, cart.updateCart, item, 'dec')
                        "
                        v-on:dec-quantity="
                          updateCart($event, cart.updateCart, item, 'inc')
                        "
                        v-on:change-qty="changeQuantity($event, cart, item)"
                        ref="qty"
                      ></quantity-ctrl>
                    </div>
                  </div>
                  <div
                    class="remove"
                    @click="removeCart(cart.removeCart, item)" 
                  >
                    remove
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div class="footer">
              <hr />
              <div class="totals">
                <div class="total">
                  {{ context.bag_data.breakup_values.display[3].display }} ( {{ getItems }} item)  
                </div>  
                <div class="price">
                  {{ context.bag_data.breakup_values.display[3].value }}
                </div>
              </div>
              <hr />
              <div>
                <fdk-link :link="`/cart/bag/`">
                  <button class="button">
                    <p class="but">Go To Shopping</p>
                  </button>
                </fdk-link>
              </div>
            </div>
          </template>
        </template>
      </fdk-cart>
    </div>
  </modal>
</transition>
</template>

<style lang="less" scoped>
.modal {
  @media @mobile {
    padding-top: 40px;
  }
}
/deep/ .modal-container {
  padding: 0 24px !important;
  max-width: 70% !important;
  max-height: 80% !important;
  @media @mobile {
    max-width: 100% !important;
    padding: 0 24px 24px 24px !important;
    max-height: none !important;
  }
  .modal-body {
    margin-top: 24 !important;
    @media @mobile{
      margin-top: 30px !important;
    }
  }
  .modal-header {
    padding: 0 !important;
    justify-content: flex-end !important;
    align-items: inherit !important;
    @media @mobile {
      top: 0;
      position: fixed;
      left: 0;
      right: 0;
      height: 36px;
      background-color: #fff;
    }
    .cross {
      position: fixed;
      padding: 10px 0;

      @media @tablet {
        margin-right: 0px !important;
      }
      @media @mobile {
        margin-right: 12px !important;
      }
      @media only screen and (max-width: 320px) {
        margin-right: 6px !important;
      }
    }
  }
}
.dark-sm {
  font-size: 12px;
  line-height: 15px;
}
.cst-lw {
  width: 100% !important;
}
.size-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media @tablet {
    flex-direction: column;
    padding-bottom: 24px;
  }
  @media @mobile {
    flex-direction: column;
    padding-bottom: 24px;
  }
  .cart {
    position: relative;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    flex-wrap: wrap;
    @media @mobile {
        padding: 0;
        margin: 0;
        flex-direction: column;
        justify-content: flex-start;
    }
    .cart-heading {
        flex: 0 0 100%;
        border-bottom: 1px solid @LightGray;
    }
    .share_popup {
    &.topLayer {
      @media @mobile {
        z-index: 10;
      }
    }
      .cart-share {
      position: absolute;
      right: 10px;
      top: 5px;
      padding: 3px;
      z-index: 1;
      cursor: pointer;
      @media @mobile {
          right: 15px;
          top: 15px;
        }
      }
    }
    .scroll {
      margin-bottom: 150px;
    }
    .leftcart {
      display:flex;
      margin-bottom: 24px;
      @media @mobile {
        margin-bottom: 16px;
      }
    }  
    .left {
        width: 168px;
        margin-right: 16px;
        @media @mobile {
        width: 112px;
        height: 160px;
        border-right: 0;
        }
    }
    &__title {
        text-transform: uppercase;
        margin-bottom: 32px;
        border-radius: 4px;
        position: relative;
        width: 219px;
        font-family: 'Marcellus';
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 36px;
        display: flex;
        letter-spacing: -0.02em;
        color: #26201A;
        justify-content: center;
        align-items: center;
        @media @mobile {
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 14px;
        font-size: 20px;
        line-height: 24px;
        }
        span {
        font-size: 14px;
        font-weight: 500;
        text-transform: none;
        margin-left: 10px;
        color: @DustyGray;
        @media @mobile {
            margin-left: 0;
            margin-top: 5px;
        }
        }
    }
    &__items {
        padding: 0px;
        border-radius: 4px;
        @media @mobile {
        padding: 10px 0 0 0;
        }
    }
    .imgClass {
      width: 100%;
      height: auto;
      aspect-ratio: 3/4;
      @media @mobile {
        width: 112px;
        height: 160px;
      }
    }
    .heading {
        font-weight: bold;
    }

    .bag-right {
      width: 248px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;  
      color: @Mako;
      @media @mobile {
        width: 212px;
        padding: 10px 0 0;
      }
      .bag-brand {
        text-transform: uppercase;
        font-family: 'Marcellus';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 28px;
        display: flex;
        align-items: center;
        letter-spacing: -0.02em;
        color: @Mako;
        width: 248px;
        @media @mobile {
          width: 212px;
          line-height: 24px;
        }
      }
      .bag-variant {
        word-wrap: break-word;
        height: 32px;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #8E8C8A;
        margin-top: 8px;
        width: 240px;
        @media @mobile {
          width: 210px;
        }
      }
      .bag-name {
        color: @Mako;
        margin: 8px 0px 0;
        width: 248px;
        height: 20px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        display: flex;
        align-items: center;
        letter-spacing: -0.02em;
        .bag-edit {
          max-width: 75px;
          border-radius: @border-radius;
          padding: 10px 20px;
          margin: 5px 0px;
          display: inline-flex;
        }
      }
      .soldby {
        color: #909090;
        line-height: 20px;
        font-weight: 300;
        text-transform: lowercase;
        font-size: 14px;
      }
      .qty-control {
        .flex-center();
        border: 1px solid @LightGray;
        .operator {
          cursor: pointer;
          width: 24px;
          height: 24px;
          background: @White;
          display: inline-block;
          border: none;
          cursor: pointer;
          padding: 2px;
          &:hover {
            background: @LightGray;
          }
        }
      }
    }

    ::v-deep .right-items {
    display: flex;
    justify-content: space-between;
    @media @mobile {
      margin-left: 0;
    }
    .remove {
      cursor: pointer;
      width: 58px;
      height: 20px;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.02em;
      -webkit-text-decoration-line: underline;
      text-decoration-line: underline;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      justify-content: center;
      .flex-center();
      margin-right: 24px;
      @media @mobile {
        margin-right: 5px;
      }
    }
    }
    ::v-deep .quantity-container {
      display: flex;
      height: 26px;
      align-items: center;
      .quantity {
        background: white;
        display: flex;
        height: 24px;

        &__button {
          width: 20px;
          cursor: pointer;
        }
        .minus {
          border-right: 1px solid #ccc;
        }
        .plus {
          border-left: 1px solid #ccc;
        }
        &__input {
          padding: 5px 10px;
          border: none;
          text-align: center;
        }
      }
      .cart-price {
        margin-left: 20px;
        width: 100px;
      }
    }
    .totals {
      display: flex;
      font-family: 'Inter';
      font-style: normal;
      line-height: 20px;
      letter-spacing: -0.02em;
      color: #26201A;
      height: 32px;
      width: 100%;
      margin-right: 20px;
      justify-content: space-between;
      margin-top: 30px;
      @media @mobile {
        margin-top: 20px;
      }
    }
    .total {
      font-weight: 400;
      font-size: 14px;
      margin-left: 29px;
    }
    .price {
      font-weight: 500;
      font-size: 16px;
      margin-right: 24px;
    }
    .button {
      width: 100%;
      text-transform: uppercase;
      text-align: center;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.4s;
      display: flex;  
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 12px 32px;
      gap: 4px;
      height: 48px;
      background-color:@PrimaryColor ;
      color: white;
      margin-top: 20px;
      margin-bottom: 40px;
      @media @mobile {
        margin-bottom: 32px;
      }
    }
    .button:hover, .button:focus {
      background-color: white;
      color: black;
      border: 1px solid black;
      box-shadow: inset 0 -3.25em 0 0 white;
    }
    .but {
      height: 20px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      display: flex;
      align-items: center;
      text-align: center;
      letter-spacing: -0.02em;
      text-transform: uppercase;
    }
    .footer {
      width: 428px;
      position: fixed;
      bottom: 0;
      background-color: #f9f7f4;
      @media @mobile {
        width: 350px;
      }
    }
  }
}
</style>

<script>
import modal2 from "./modal2.vue";
import cartitem from "./../global/components/cart/cart-item.vue";
import "vue-select/dist/vue-select.css";
import quantityctrl from "./../global/components/cart/quantity-ctrl.vue"
import chipitem from "./../global/components/cart/cart-chip-item.vue"
import cartlanding from "./../templates/pages/cart-landing.vue"
import SvgWrapper from "./../components/common/svg-wrapper.vue"

export default {
  name: "size-cart",
  extends: modal2,
  components: {
    modal: modal2,
    "cart-item": cartitem,
    "quantity-ctrl": quantityctrl,
    "chip-item": chipitem,
    "cart-landing": cartlanding,
    "svg-wrapper": SvgWrapper,
  },
  props: {
  isOpen: {
    type: Boolean,
    default: false,
  },
  context:{
      type:Object,
  },
  item: {},
  updateCartSize: {},
},
  
  data() {
      return {
          isLoading: false,
          showQuantityError: false,
      };
  },
  mounted() {
      console.log("bag",this.context);
      console.log("bagdata",this.context.bag_data);
      
  },
  computed: {
    isLadderPricing() {
      let getLadderPricing = this.item?.promotions_applied.find(
        (val) => val.promotion_type == "ladder_price"
      );
      return getLadderPricing;
    },
    getItems() {
      let data = 0;
      for( let i=0; i<this.context.bag_data.items.length;i++) {
        
        data += this.context.bag_data.items[i].quantity
      }
      return data;
    }
  },
  watch: {
    context: {
      handler(newVal) {
        console.log("bagdata+++++",newVal);
      },deep:true,
    }
  },
  methods: {
     getColorName(value) {
      let colorName = '';
      if(value === this.context.product.name) {
        for(let i=0; i<this.context.product_variants.variants.variants[0].items.length; i++) {
          colorName += (this.context.product_variants.variants.variants[0].items[i].color_name)
          if(i < this.context.product_variants.variants.variants[0].items.length - 1){
            colorName += "/"
          }
        }
      }
      return colorName;
    },
    getItemPrice(item) {
      return item.article.price.converted.selling * item.quantity;
    },
    updateCart(total, func, item, operation) {
      console.log({ total, func, item, operation });
      let stotal =
        operation === "qty"
          ? total
          : operation === "inc"
          ? total + 1
          : operation === "dec"
          ? total - 1
          : total;
      if (stotal > item.article.quantity && operation === "inc") {
        this.$refs["qty"].resetQuantity(item.quantity);
        this.showQuantityError = true;
        setTimeout(() => {
          this.showQuantityError = false;
        }, 3000);
        return;
      } else if (stotal > item.article.quantity && operation === "dec") {
        item.quantity = item.article.quantity + 1;
        this.showQuantityError = false;
      } else {
        this.showQuantityError = false;
      }
      // this.$emit("update-cart", { func, item, operation });
      let cartItem = {...item};
      if (operation === "inc") cartItem.quantity++;
      else if (operation === "dec") {
        if (item.article.quantity < item.quantity) {
          cartItem.quantity = item.article.quantity;
        } else {
          cartItem.quantity--;
        }
      } 
      else if (operation === "qty") cartItem.quantity = item.quantity;

      if (cartItem.quantity <= 0) {
        cartItem.quantity = 0;
      }
      func([cartItem])
        .then(({ data }) => {
          // this.isLoading = false;
          //   this.validateCart();
        })
        .catch((err) => {
          console.log(err);
          // this.isLoading = false;
        });
    },
    removeCart(func, item) {
      // this.$emit("remove-cart", { func, item });
      let cartItem = {...item};
      func([cartItem])
        .then(({ data }) => {
          // this.isLoading = false;
          //   this.validateCart();
        })
        .catch((err) => {
          console.log(err);
          // this.isLoading = false;
        });
    },
    changeQuantity(total, cart, item) {
      if (item.availability.out_of_stock) {
        this.showQuantityError = false;
        total = item.article.quantity;
        this.updateQuantity(total, cart, item);
      } else if (total > item.article.quantity) {
        this.$refs["qty"].resetQuantity(item.quantity);
        this.showQuantityError = true;
        setTimeout(() => {
          this.showQuantityError = false;
        }, 3000);
        return;
      } else if (total === 0) {
        this.showQuantityError = false;
        this.updateQuantity(total, cart, item);
      } else {
        this.showQuantityError = false;
        this.updateQuantity(total, cart, item);
      }
    },
  updateError() {
    this.showQuantityError = true;
    setTimeout(() => {
      this.showQuantityError = false;
    }, 3000);
  },
  updateQuantity(quantity, cart, item) {
    let data = {...item, quantity: Number(quantity)}
    this.showQuantityError = false;
    this.updateCart(quantity, cart.updateCart, data, "qty");
  },
  openLadderPopup() {
    const body = document.body;
    body.classList.add("no-scroll");
    this.isShowLadderPopup = true;
  },
  printData(data) {
    console.log(data);
  },

  closeDailog() {
    document.querySelector("body").style.overflow = "auto";
    this.$emit("closedialog");
  },
  removeFromCart() {
    this.confirmModalvisible = false;
    this.$emit("removeCart", { item: this.item, func: this.cart.removeCart });
  },
},
};
</script>
