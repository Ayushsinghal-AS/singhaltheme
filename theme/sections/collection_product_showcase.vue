<template>
  <div class="main"
    :class="{
      'section-main-container': !getSectionValue(settings,'full_width'),
      'full-width-section': getSectionValue(settings,'full_width'),
    }"
  >
    <div class="gallery-container" :class='[global_config.props.anim_name]' :style="`margin-bottom: ${global_config.props.margin_between}px;`">     
      <div class="card-container">
        <div class="top-items">
          <div class="title-block">
            <div
              class="section-heading font-header"
              v-if="
                (getSectionValue(settings,'title') &&
                getSectionValue(settings,'title').length > 0) ||getSectionValue(settings,'cta_text')
              "
            >{{ getSectionValue(settings,'title') }}</div>
          </div>
          <template>
            <div  v-if="isStyle1">
                <div class="pr-img">           
                  <div class="card" v-for="(product,i) in getProducts" :key="i">                      
                    <fdk-link :link= "`/product/${product.slug}`">
                      <fy-product-card 
                      :product="product"
                      :showWishlist="true"                      
                      :context="context"
                      :global_config="global_config"                      
                    ></fy-product-card>
                    </fdk-link>
                  </div>                   
              </div>
              <div class="but1">
                <fdk-link :link= "`/products/`">
                  <div class="button1">
                    <button class="but11"
                    v-if="getSectionValue(settings,'button_text')"
                  >{{ getSectionValue(settings,'button_text') }}</button>
                  </div>
                </fdk-link>
              </div>
            </div>
            <div class="a" v-show="isStyle2">
              <div v-if="products.length > 0" class="glide-cont" :class="'glide'+ _uid" ref="glide">
                <div data-glide-el="track" class="glide__track">
                  <div class="glide__slides" :class="{ 'ssr-slides-box': !checkisBrowser() && !isMounted }">
                    <div class="glide__slide" v-for="(product,i) in products" :key="i">
                      <fdk-link :link= "`/product/${products[i].slug}`">
                      <fy-product-card2 
                      :product="product"
                      :showWishlist="true"                      
                      :context="context"
                      :global_config="global_config"                      
                    ></fy-product-card2>
                    </fdk-link> 
                    </div>
                  </div>
                </div>
                <div class="div2">
                  <div
                    class="glide__bullets" data-glide-el="controls[nav]">
                    <button
                      class="glide__bullet" :data-glide-dir="'=' + entry" v-for="(entry, index) in glidePaginate(products.length, getSectionValue(settings,'item_count'))" :key="index">
                    </button>
                  </div>
                </div>
                <div
                  class="arrows" 
                  v-if="products.length > getSectionValue(settings,'item_count')">
                  <section>
                    <div class="prev-btn btn-nav-gallery" ref="prevArrow" @click="prevSlide">
                      <div class="icon">
                        <svg-wrapper :svg_src="'nav-arrow'"></svg-wrapper>
                      </div>
                    </div>
                    <div class="next-btn btn-nav-gallery" ref="nextArrow" @click="nextSlide">
                      <div class="icon icon-next">
                        <svg-wrapper :svg_src="'nav-arrow'"></svg-wrapper>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              <div class="but2">
                <fdk-link :link= "`/products/`">
                  <div class="button2">
                    <button class="but22"
                    v-if="getSectionValue(settings,'button_text')"
                  >{{ getSectionValue(settings,'button_text') }}</button>
                  </div>
                </fdk-link>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div :class="{ 'flexFull': global_config.props.anim_name == 'animFlex', }"></div>
  </div>
</template>
<!-- #region  -->

<settings>
{
    "name": "collection_product",
    "label": "Collection's Product Showcase",
    "props": [
        {
            "type": "text",
            "id": "title",
            "default": "",
            "label": "Heading"
        },
        {
          "id": "mobile_layout",
          "type": "select",
          "options": [
              {
                  "value": "style1",
                  "text": "Style 1"
              },
              {
                  "value": "style2",
                  "text": "Style 2"
              }
          ],
          "default": "style1",
          "label": "Mobile Layout",
          "info": "Alignment of content"
        },
        {
            "id": "desktop_layout",
            "type": "select",
            "options": [
                {
                    "value": "style1",
                    "text": "Style 1"
                },
                {
                    "value": "style2",
                    "text": "Style 2"
                }
            ],
            "default": "style1",
            "label": "Desktop Layout",
            "info": "Alignment of content"
        },
        {
          "id": "collection",
          "type": "collection",
          "default": "",
          "label": "Collection",
          "info": "Alignment of content"
        },
        {
            "type": "text",
            "id": "button_text",
            "default": "",
            "label": "Button Text"
        }
    ]
}
</settings>
<!-- #endregion -->
<style scoped lang="less">
.main {
  max-width: 1440px;
  padding: 0px;
}
.gallery-container {
  @media @mobile {
    margin-top: 0;
  }
  .card-container {
    margin: 0;
    .top-items {
      border-radius: @border-radius;
      background: transparent;
      @media @mobile {
        margin-left: 8px;
      }
    }

    .title-block {
      display: flex;
      text-transform: uppercase;
      text-align: center;
      box-sizing: border-box;
      position: relative;
      max-width: 1440px;
      height: 36px;
      margin: 40px auto 56px;
      > div {
        flex: 0 0 100%;
      }
      @media @tablet {
        max-width: 744px;
        height: 32px;
        margin: 32px auto 32px;
      }
      @media @mobile {
        margin: 24px auto 24px;
      }
      .section-heading {
        font-size: 32px;
        font-weight: 400;
        text-transform: uppercase;
        text-align: center;
        font-style: normal;
        color: @TextHeading;
        line-height: 36px;
        letter-spacing: -0.02em;
        @media @tablet {
          font-size: 32px;
          line-height: 36px; 
        }
        @media @mobile {
          font-size: 26px;
          line-height: 32px;
        }
      }
    }
    .a {
      @media @tablet {
        padding-left: 40px;
      }
      @media @mobile {
        padding-left: 0px;
      }
    }
    .pr-img {
      display: grid;
      justify-content: center;
      flex-flow: wrap;
      grid-template-columns: repeat(auto-fill,minmax(22%, 1fr));
      grid-auto-rows: auto;
      grid-template-rows: 1fr;
      grid-gap: var(--gapTop) var(--gap);
      gap: 56px 24px;
      padding: 0px 72px;
      @media @tablet {
        grid-template-columns: repeat(auto-fill,minmax(43%, 0fr)); 
        gap: 24px 24px;
        padding: 0px;
      }
      @media @mobile {
        grid-template-columns: repeat(auto-fill,minmax(48%, 0fr)); 
        gap: 24px 8px;
        justify-content: flex-start;
        padding: 0px; 
        .card {
          &:first-child {
            grid-column-start: 1;
            grid-column-end: -1;
          }
        }
      }
    }
    .ayush {
      display: none;
      @media @mobile {
        display: block;
        width: 100%;
        height: auto;
      }
    }
    .link {
      position: absolute;
      line-height: 35px; //this is used to match the title-block height
      right: 0px;
      bottom: @title-margin-desktop;
      @media @tablet {
        display: none;
      }
    }
  }
  .arrows {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    bottom: 0%;
    right: 0;
    margin: -40px 30px 0 0;
    @media @tablet {
      display: none;
    }
    section {
      position: relative;
      width: 100%;
      margin: 0 auto;
      display: flex;
      padding: 0 20px;
      box-sizing: border-box;
    }
  }
  .prev-btn {
    margin-right: 22px;
  }

  .glide__bullets {
    position: relative;
    z-index: 2;
    margin-top: 76px;
    bottom: 15px;
    left: 50%;
    // display: inline-flex;
    align-items: center;
    list-style: none;
    transform: translateX(-50%);
    @media @mobile {
      margin-top: 20px;
    }
  }
  .glide__bullet {
    background-color: unset;
    border: 1px solid @color-black;
    box-shadow: unset;
    &:hover {
      background-color: @color-black;
    }
    &.glide__bullet--active {
      background-color: @color-black;
    }
  }
  .glide__bullet {
    background-color: lightgrey;
    width: 100%;
    height: 1%;
    padding: 0;
    border-radius: 0%;
    border: 2px solid transparent;
    transition: all .3s ease-in-out;
    cursor: pointer;
    line-height: 0;
    margin: 0 0;
  }
  .glide__slide {
    height: auto;
    margin-left: 0px;
    margin-right: 0px;
    a {
      display: flex;
      height: 100%;
    }
    /deep/ .placeholder-svg {
      height: 99%;
      display: flex;
      svg {
        width: 100%;
      }
    }
  }
  .glide__slides.ssr-slides-box {
    touch-action: unset;
    overflow-x: auto;
    .glide__slide {
      margin-right: 30px;
      width: auto;
    }
  }
  .div2 {
    display: grid;
    grid-template-columns: auto 150px;
    @media @tablet {
      grid-template-columns: auto 0px;
      display: none; 
    }
    @media @mobile {
      grid-template-columns: auto 0px; 
      display: none;
    }
  }
  .btn-nav-gallery {
    z-index: @layer;
    background-color: transparent;
    padding: unset;
    cursor: pointer;
    width: 50px;
    display: flex;
    justify-content: center;
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.2);
    }
  }
  .next-btn {
    margin-left: auto;
  }
  .icon {
    display: inline-block;
    width: 45px;
    height: 45px;
    background-size: cover;
  }
  .icon-next {
    transform: rotate(180deg);
  }
  .hero__image {
    /deep/ .fy__img {
      width: 100%;
    }
  }
  .imagesize {
    width: 306px;
  }
  .button1 {
    color: @TextHeading;
    background-color:@PrimaryColor ;
    width: 140px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media @tablet {
      margin-top: 0px;
    }
    @media @mobile {
      margin-left: 0px;
      margin-top: 0px;
    }
  }
  .button2 {
    color: @TextHeading;
    background-color:@PrimaryColor;
    width: 140px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media @tablet {
      display: flex;
      justify-content: center;
    }
  }
  .but1 {
    display: flex;
    justify-content: center;
    margin-top: 56px;
    @media @tablet {
      margin-top: 32px;
    }
    @media @mobile {
      margin-top: 24px;
    }
  }
  .but11 {
    background-color: @ButtonPrimary;
    color: @ButtonSecondary;
    border: 0px;
  }
  .but2 {
    display: flex;
    justify-content: center;
    margin-top: 76px;
    @media @tablet {
      margin-top: 32px;
    }
    @media @mobile {
      margin-top: 24px;
    }
  }
  .but22 {
    background-color: @ButtonPrimary;
    color: @ButtonSecondary;
    border: 0px;
  }
}
</style>
<script>
import { detectMobileWidth, glidePaginate } from "../helper/utils";
import { isBrowser, isNode } from "browser-or-node";
import Glide from "@glidejs/glide";
import "../../node_modules/@glidejs/glide/dist/css/glide.core.min.css";
import "../../node_modules/@glidejs/glide/dist/css/glide.theme.min.css";
import btn from "../components/common/button.vue";
import SvgWrapper from "../components/common/svg-wrapper.vue";
import { getSectionValue } from "../helper/utils";
import fyProduct from "../global/components/fy-product-card.vue";
import fyProduct2 from "../global/components/fy-product-card2.vue";
import emergeImage from "../global/components/common/emerge-image.vue";

export default {
  props: ["settings", "apiSDK", "global_config"],
  components: {
    "sm-button": btn,
    "svg-wrapper": SvgWrapper,
    "fy-product-card": fyProduct,
    "fy-product-card2": fyProduct2,
    "emerge-img": emergeImage,
  },
  watch: {
    settings: function(newVal, oldVal) {
      this.cleanupComponent();
      this.initializeComponent();
    },
    products: function(newVal, oldVal) {
      this.cleanupComponent();
      this.initializeComponent();
    },
    isStyle2(newVal) {
      if(newVal) {
        this.initCarousel();
      }
    }
  }, 
 
  mounted() {
    let option = {
      slug: this.getSectionValue(this.settings,'collection')
    };
    this.fetchData(option);
    this.initializeComponent()
    isBrowser && window.addEventListener("resize", this.onResize);
  },
  data: function() {
    return {
      products: [],
      image: [],
      title: [],
      description: [],
      slug_val: "",
      isMounted: false,
      windowWidth: isBrowser ? window.innerWidth : 0,
      glideOptions: {
        type: 'carousel',
        startAt: 0,
        gap: 24,
        focusAt: 0,
        perView: 4,
        breakpoints: {
          1024: { 
            perView: 4
          },
          780: {
            perView: 1,
            peek: { before: 0, after: 300 }
          },
          480: {
            perView: 1,
            peek: { before: 0, after: 80 },
            gap: 8
          }
        }
      },
      carouselHandle: null
    };
  },
  computed: {
    getProducts() {
      if(this.windowWidth < 481) {
        return this.products.slice(0,5);
      }
      if(this.windowWidth < 769) {
        return this.products.slice(0,4);
      }
      return this.products.slice(0,8);
    },
    isStyle1() {
      if(this.windowWidth < 481 && this.getSectionValue(this.settings,'mobile_layout') === 'style1') {
        return true;
      } if(this.windowWidth > 480 && this.getSectionValue(this.settings,'desktop_layout') === 'style1') {
        return true;
      } 
      return false;
    },
    isStyle2() {
      if(this.windowWidth < 481 && this.getSectionValue(this.settings,'mobile_layout') === 'style2') {
        return true;
      } if(this.windowWidth > 480 && this.getSectionValue(this.settings,'desktop_layout') === 'style2') {
        return true;
      } 
      return false;
    }
  },
  methods: {
    onResize() {
      this.windowWidth = isBrowser ? window.innerWidth : 0;
    },
    getSectionValue,

    fetchData(option) {
      this.$apiSDK.catalog.getCollectionItemsBySlug(option).then(data => {
        this.image = data.items[0];
        this.products = data.items;
        console.log("data",data.items);
      });
    },
    getImageUrl(medias) {
      return medias.url
    },
    checkisBrowser() {
      return isBrowser
    },
    glidePaginate,
    prevSlide() {
      let item_count = 4;
      if (detectMobileWidth()) {
        if (this.carouselHandle.index - 1 >= 0) {
          this.carouselHandle.go(`=${this.carouselHandle.index - 1}`);
        }
      } else {
        if (this.carouselHandle.index - item_count >= 0) {
          this.carouselHandle.go(`=${this.carouselHandle.index - item_count}`)
        } else {
          this.carouselHandle.go(`<<`);
        }
      }
    },
    nextSlide() {
      let item_count = 4;
      if (detectMobileWidth()) {
        if (this.carouselHandle.index + 1 >= this.products.length - 1) {
          this.carouselHandle.go(`=${this.carouselHandle.index + 1}`);
        }
      } else {
        if (
          this.carouselHandle.index + item_count <
          this.products.length)
          {
          this.carouselHandle.go(`=${this.carouselHandle.index + item_count}`);
        } else {
          this.carouselHandle.go(`>>`);
        }
      }
    },
    initCarousel() {
      if (
        isNode ||
        this.getSectionValue(this.settings,'desktop_layout') !== 'style2' || this.carouselHandle) {
        return;
      }
      if (!this.$refs.glide) {
        setTimeout(() => {
          this.initCarousel()
        }, 1000);
        return;
      }
      this.$nextTick(() => {
        try {
          if (window.screen.width > 480 && window.screen.width <= 768) {
            this.glideOptions.gap = 40;
          } else if (window.screen.width <= 480) {
            this.glideOptions.gap = 12;
          }
          this.carouselHandle = new Glide(this.$refs.glide, this.glideOptions)
          let glideClass = this.$refs.glide.getAttribute('class')
          this.carouselHandle.on(['move.after'], () => {
            let allDots = document.querySelectorAll(`.${glideClass} [data-glide-dir]`)
            if (allDots && allDots.length > 0) {
              allDots.forEach(ele => {
                ele.classList.remove('glide__bullet--active')
              })
            }
            let currentDot = this.carouselHandle ? document.querySelectorAll(`.${glideClass} [data-glide-dir='=${this.carouselHandle.index}']`): null;
            if (currentDot && currentDot.length > 0) {
              currentDot[0].classList.add('glide__bullet--active');
            }
          })
          this.carouselHandle.mount()
        } catch (ex) {}
      })
    },
    initializeComponent() {
      this.isMounted = true;
      // if (window.screen.width > 600 && window.screen.width <= 1024) {
      //   this.settings.props.item_count.value = 3;
      // } else if (window.screen.width > 480 && window.screen.width <= 600) {
      //   this.settings.props.item_count.value = 2;
      // } else if (window.screen.width <= 480) {
      //   this.settings.props.item_count.value = 1;
      // }
      // this.glideOptions.perView = this.settings.props.item_count.value;
      this.initCarousel()
    },
    cleanupComponent() {
      if (isBrowser && this.carouselHandle) {
        this.carouselHandle.destroy();
        this.carouselHandle = null;
      }
    }
  },
  beforeDestroy() {
    this.cleanupComponent()
    isBrowser && window.removeEventListener("resize", this.onResize);
  }

};
</script>
