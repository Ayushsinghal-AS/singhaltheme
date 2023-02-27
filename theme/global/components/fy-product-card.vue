<template>
  <fdk-product-card class="product-card-container">
    <template slot-scope="productData">
      <div
        class="product-card animated fadeIn"
        :class="{ 'disable-cursor': !product.sellable }"
        @mouseover="showSizeContainer()"
        @mouseleave="closeSizeContainer()"
        @click="shouldRedirect()"
      >
        <div class="overlay" v-if="disable"></div>
        <fdk-accounts>
          <template slot-scope="accountsData">
            <div
              class="wishlist-container"
              v-if="showWishlist && isMounted"
              @click.prevent="
                accountsData.is_logged_in
                  ? onClickWishlist($event, productData, product)
                  : accountsData.openLogin()
              "
            >
              <div v-if="product.follow" style="text-align: center">
                <!-- wishlist Pink -->
                <!-- <svg-wrapper :svg_src="'wishlist-active'"></svg-wrapper> -->
                <svg
                  v-if="!isWishListPage"
                  width="21"
                  height="19"
                  viewBox="0 0 21 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5017 17.8047C10.5017 17.8047 18.1548 10.7276 19.388 8.29748C20.1588 6.77868 20.1144 5.29626 19.7327 4.07013C19.1109 2.12834 17.2193 0.804688 15.2518 0.804688C14.1124 0.804688 13.0643 1.23108 12.2457 1.91848C11.6212 2.47736 11.0312 3.0875 10.5 3.74106C9.96877 3.0875 9.37887 2.47736 8.75436 1.91849C7.93573 1.23109 6.8876 0.804692 5.7482 0.804692C3.78069 0.804692 1.88909 2.12834 1.26726 4.07014C0.885638 5.29627 0.841218 6.77869 1.61196 8.29749C2.84515 10.7276 10.5017 17.8047 10.5017 17.8047Z"
                    fill="#26201A"
                    stroke="#26201A"
                    stroke-width="1.5"
                  />
                </svg>
                <svg
                  v-else
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 19L1 1M1 19L19 1"
                    stroke="#26201A"
                    stroke-width="1.5"
                  />
                </svg>
              </div>
              <div v-else style="text-align: center">
                <!-- Wishlist Transparent -->
                <svg-wrapper :svg_src="'wishlist'"></svg-wrapper>
              </div>
            </div> </template
        ></fdk-accounts>
        <div
          class="product-image"
          @mouseleave="imgHoverout"
          @mouseenter="imgHover"
          :class="{ 'enable-opacity': !product.sellable }"
        >
          <emerge-image
            v-for="(image, item) in getProductImages"
            :src="image.url"
            :alt="image.alt"
            :asp_ratio="4/5"
            :key="item"
            class="imgClass"
            v-show="item === currentIndex"
            :sources="[
              { breakpoint: { min: 768 }, width: 360 },
              { breakpoint: { min: 361 }, width: 360 },
              { breakpoint: { max: 360 }, width: 360 },
            ]"
          />
          <div class="indicator-container">
            <span
              v-for="(image, item) in getProductImages"
              v-show="visible"
              v-bind:class="{ active: item === currentIndex }"
              :key="item"
            ></span>
          </div>
        </div>
        <div class="tablet">
          <mobile-carousel
            ref="carousel"
            :images="getProductImages"
          ></mobile-carousel>
        </div>
      </div>
      <!-- <div
        class="discount-container"
        v-if="product.discount && product.sellable"
      >
        <div class="discount">
          <div class="special-offer-text bold-xxxxs">
            {{ product.discount }}
          </div>
        </div>
      </div> -->
      <!-- <div class="out-of-stock-container" v-if="!product.sellable">
        <div class="out-of-stock">
          <div class="out-of-stock-text bold-xxxxs">SOLD OUT</div>
        </div>
      </div> -->
      <div class="allTags-container font-body">
        <div class="outStock-clr" v-if="!product.sellable && showTags">
          <div class="allTag">Sold Out</div>
        </div>
        <div class="sale-clr" v-else-if="product.discount">
          <div class="allTag">
            {{ product.discount }}
          </div>
        </div>
        <div class="badge-clr" v-else-if="product.teaser_tag && showTags">
          <div class="allTag">
            {{ product.teaser_tag }}
          </div>
        </div>
        <div class="tag-clr" v-else-if="product.tags[0] && showTags">
          <div class="allTag">
            {{ product.tags[0] }}
          </div>
        </div>
        <!-- <div class="limStock-clr" v-else>
            <div class="allTag">
              Low in stock
            </div>
          </div> -->
      </div>
      <div
        class="product-desc"
        :class="{ 'disable-cursor': !product.sellable }"
      >
        <!-- Product Rating -->
        <div style="height: 20px" v-if="product.rating">
          <fy-rating :rating="product.rating"></fy-rating>
        </div>
        <!-- End of Product Rating -->
        <div class="card-desc">
          <div class="ukt-title font-body" :title="product.name">
            {{ product.name }}
          </div>
          <!-- <div
            class="info regular-xxxs font-body"
          >
            {{ getColorName(product.name) }}          
          </div>-->
          <div class="price font-body">
            <span class="effective-price">
              <div>
                <span class="regular-xs font-body">
                  <span v-if="product.price.effective">
                    {{
                      getListingPrice("effective") ||
                      getProductPrice("effective")
                    }}</span
                  >
                </span>
                <span
                  class="regular-xxxs text-seperator font-body"
                  v-if="
                    getProductPrice('effective') !== getProductPrice('marked')
                  "
                ></span>
                <span
                  class="strike-through regular-xxxs cl-DustyGray2 font-body"
                  v-if="
                    getProductPrice('effective') !== getProductPrice('marked')
                  "
                >
                  {{ getListingPrice("marked") || getProductPrice("marked") }}
                </span>
              </div>
            </span>
          </div>
        </div>
      </div>
    </template>
  </fdk-product-card>
</template>

<script>
import fyrating from "./../../global/components/fy-rating.vue";
import { isBrowser } from "browser-or-node";
import emergeImage from "../../global/components/common/emerge-image.vue";
import SvgWrapper from "./../../components/common/svg-wrapper.vue";
import mobilecarousel from "./../../components/mobile-pdp-carousel.vue";

export default {
  components: {
    "fy-rating": fyrating,
    "emerge-image": emergeImage,
    "svg-wrapper": SvgWrapper,
    "mobile-carousel": mobilecarousel,
  },
  props: {
    product: {},
    showWishlist: {
      type: Boolean,
      default: false,
    },
    isWishListPage: {
      type: Boolean,
      default: false,
    },
    activeProductId: {
      default: 0,
    },
    global_config: {},
    listing_price_config: {
      type: String,
    },
    isPLPpage: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    this.isMounted = true;
    this.fetchData();
  },
  data() {
    return {
      disable: false,
      isMounted: false,
      images: [],
      currentIndex: 0,
      myInterval: "",
      statesCount: 1,
      visible: false,
      IsRunning: false,
    };
  },
  methods: {
    // getColorName(value) {
    //   let colorName = '';
    //     if(value === this.product.name) {
    //       for(let i=0; i<this.product.variants[0].items.length; i++) {
    //         colorName += (this.product.variants[0].items[i].color_name)
    //         if(i < this.product.variants[0].items.length - 1){
    //           colorName += "/"
    //         }
    //       }
    //     }
    //     return colorName;
    // },
    fetchData() {
      for (let i = 0; i < this.product.medias.length; i++) {
        this.images.push(this.product.medias[i].url);
      }
    },
    imgHover() {
      if (this.IsRunning == false) {
        this.IsRunning = true;
        this.myInterval = setInterval(() => {
          this.currentIndex =
            (this.currentIndex + 1 + this.images.length) % this.images.length;
        }, 1000);
      }
      this.visible = true;
    },
    imgHoverout() {
      this.currentIndex = 0;
      this.visible = false;
      this.IsRunning = false;
      clearInterval(this.myInterval);
    },
    onClickWishlist(event, productData, product) {
      this.isWishlist();
      productData.updateWishList(event, product);
    },
    getListingPrice(key) {
      let price = "";
      switch (this.listing_price_config) {
        case "min":
          price = this.$options.filters.currencyformat(
            this.product.price[key].min
          );
          break;
        case "max":
          price = this.$options.filters.currencyformat(
            this.product.price[key].max
          );
          break;
        case "range":
          //not handling this as its the default behaviour of getProductPrice
          break;
        default:
          break;
      }
      return price;
    },
    getProductPrice(key) {
      if (this.product.price) {
        return this.product.price[key].min !== this.product.price[key].max
          ? this.$options.filters.currencyformat(this.product.price[key].min) +
              " - " +
              this.$options.filters.currencyformat(this.product.price[key].max)
          : this.$options.filters.currencyformat(this.product.price[key].min);
      }
      return "";
    },
    closeSizeContainer() {
      if (!this.showSizes) {
        this.product.is_active = false;
        // this.$forceUpdate();
      }
    },
    showSizeContainer() {
      this.product.is_active = true;
      // this.$forceUpdate();
    },
    shouldRedirect() {
      if (this.showSizes) {
        event.preventDefault();
      }
    },
    isWishlist() {
      if (this.isWishListPage) {
        this.disable = true;
      }
    },
  },
  computed: {
    imageUrl() {
      return this.product && this.product.medias.length > 0
        ? this.product.medias[0].url
        : "";
    },
    imageAlt() {
      return (
        this.product?.medias?.[0]?.alt ||
        `${this.product.brand.name} | ${this.product.name}`
      );
    },
    showSizes: {
      get: function () {
        return this.product.uid === this.activeProductId;
      },
    },
    getProductImages() {
      return this.product.medias.filter((media) => {
        return media.type == "image";
      });
    },
  },
};
</script>

<style scoped lang="less">
.opacity-card {
  opacity: 0.5;
}
/deep/.imgClass {
  transition: opacity 0.5s ease-in-out;
  .fy__img {
    border-radius: 2px;
  }
}

.product-card-container {
  position: relative;
  width: 100%;
}

.product-card {
  width: 100%;
  position: relative;
  border-radius: 5%;
  cursor: pointer;

  .overlay {
    background: white;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0.6;
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  .product-image {
    border-radius: 0;
    overflow: hidden;
    aspect-ratio: 4/5;
    position: relative;
    @media @tablet {
      width: 100%;
      display: none;
    }
    @media @mobile {
      padding-top: 24px;
      width: 100%;
      display: none;
    }
    .indicator-container {
      display: flex;
      margin: auto;
      width: 100%;
      position: absolute;
      bottom: 0px;
    }

    .indicator-container span {
      width: 100%;
      height: 4px;
      background-color: gray;
    }

    span.active {
      transition: 0.3 ease-in-out;
      width: 100%;
      height: 4px;
      background-color: black;
      opacity: 1;
    }
  }
}
.infinite-list {
  .product-image {
    min-height: 386px;
    @media @mobile {
      height: unset;
      min-height: 300px;
    }
    @media @sm-mobile {
      height: unset;
      min-height: 255px;
    }
  }
}
.wishlist-container {
  width: 20%;
  height: 10%;
  position: absolute;
  top: 18px;
  display: block;
  right: 0px;
  z-index: 1;
  cursor: pointer;
  @media @tablet {
    right: 0;
  }
  @media @mobile {
    top: 35px;
    right: 0;
  }
}
.discount-container {
  position: absolute;
  bottom: 27%;
  color: @TextHeading;
  width: 100%;
  height: 25px;
  @media @mobile {
    bottom: 32%;
  }
}
.discount {
  background: url("../../assets/images/special-badge.png") bottom left no-repeat;
}
.special-offer-text {
  text-align: left;
  line-height: 25px;
  padding-left: 8px;
}
.out-of-stock-container {
  position: absolute;
  bottom: 27%;
  color: @TextHeading;
  width: 100%;
  height: 25px;
  @media @mobile {
    bottom: 32%;
  }
}
.out-of-stock {
  background: url("../../assets/images/special-badge-white.png") bottom left
    no-repeat;
}
.out-of-stock-text {
  text-align: left;
  line-height: 25px;
  padding-left: 8px;
}

.product-desc {
  display: block;
}
.wrap-text {
  text-overflow: ellipsis;
  overflow: hidden;
  width: 99%;
  height: 1.2em;
  white-space: nowrap;
}
.card-desc {
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  // white-space: nowrap;
  box-sizing: border-box;
  .ukt-title {
    padding: 16px 0 0 0;
    height: 20px;
    font-style: normal;
    color: @TextHeading;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
    @media @mobile {
      height: 16px;
      font-size: 14px;
    }
  }
  .info {
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 5px 0 0px 0;
    white-space: normal;
    box-sizing: border-box;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    color: @TextHeading;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    @media @mobile {
      padding: 6px 0 0px 0;
    }
  }

  .price {
    text-align: left;
    padding: 8px 0 0 0;
    color: @TextHeading;
    @media @mobile {
      padding: 10px 0 0 0;
    }
    .effective-price {
      height: 20px;
      color: @TextHeading;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: -0.02em;
      @media @mobile {
        font-size: 14px;
        line-height: 16px;
      }
    }
  }
}
.text-seperator {
  padding: 0 5px;
}
.rupeeSymbol {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 10px;
  color: inherit;
  padding: 0 2px 0 0;
}
// .cl-Profit {
//   // color: #fb406b;
// }

.strike-through {
  text-decoration: line-through;
}
.disable-cursor {
  cursor: not-allowed !important;
}

.allTags-container {
  position: absolute;
  top: 16px;
  left: 16px;
  min-width: 40px;
  max-width: 98px;
  width: auto;
  height: 24px;

  @media @mobile {
    top: 4px;
    left: 0px;
  }
}

.badge-clr {
  color: #ba9126;
  background-color: #fcf2ce;
}

.tag-clr {
  color: @InformationText;
  background-color: @InformationBackground;
}

.sale-clr {
  color: @ThemeAccentL5;
  background-color: @SaleBadgeBackground;
}

.outStock-clr {
  color: @ThemeAccentL5;
  background-color: @ThemeAccentD5;
}

.limStock-clr {
  color: @ThemeAccentL5;
  background-color: @ErrorBackground;
}

.allTag {
  padding: 4px 8px;
  //styleName: Vsml, caption, label/Vsml Body - 12px semi bold;
  font-family: Inter;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0em;
}

.tablet {
  display: none;
  width: 100%;
  @media @tablet {
    display: block;
  }
}
.mobile {
  display: none;
  @media @mobile {
    display: block;
  }
}
.enable-opacity {
  opacity: 0.5;
}
</style>
