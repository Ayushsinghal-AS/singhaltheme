<template>
  <section :class="['media-with-text','full-width-section','mirror-' + settings.props.mirror.value, global_config.props.anim_name]"
   :style="`margin-bottom: ${global_config.props.margin_between}px;`">
    <div :class="['image-section-first']">
      <emerge-img :src=this.img1 />
    </div>

    <div :class="['image-section-second-M']">
      <ul>
        <li v-for="items in this.img" :key="items">
          <emerge-img :src="items.url" />
        </li>
      </ul>
    </div>

    <div :class="['media-with-text__content']">
      <div :class="['image-section-first-M']">
        <emerge-img :src=this.img1 />
      </div>

      <div :class="['image-section-second']">
          <ul>
            <li v-for="items in this.img" :key="items">
              <emerge-img :src="items.url" />
            </li>
          </ul>
      </div>
      <div class="media-with-text__content--main font-header">
        {{ settings.props.productName.value }}
      </div>
      <div class="media-with-text__content--sub font-body">
        {{ settings.props.productDescription.value }}
      </div>
      <div class="media-with-text__content--btn">
        <fdk-link :link= "`/product/${slug_val}`">
          <button class="btn_main">{{ settings.props.button_text.value }}</button>
        </fdk-link>
      </div>
    </div>
    <div :class="{ 'flexFull': global_config.props.anim_name == 'animFlex', }"></div>
  </section>
</template>

<!-- #region  -->

<settings>
{
  "name": "product-showcase",
  "label": "Product Showcase",
  "props": [
    {
      "type": "select",
      "id": "mirror",
      "options": [
          {
              "value": "on",
              "text": "ON"
          },
          {
              "value": "off",
              "text": "OFF"
          }
      ],
      "default": "off",
      "label": "Mirror layout"
    },
    {
      "type": "product",
      "id": "Product", 
      "default": "",
      "label": "Select Product"
    },
    {
      "type": "range",
      "id": "slide_interval",
      "min": 1,
      "max": 10,
      "step": 1,
      "unit": "sec",
      "label": "Product image slidshow speed",
      "default": 2,
      "info": "Autoplay slide duration"
    },
    {
      "type": "textarea",
      "id": "productName",
      "default": "",
      "label": "Product Name"
    },
    {
      "type": "textarea",
      "id": "productDescription",
      "default": "",
      "label": "Product Description"
    },
    {
      "type": "text",
      "id": "button_text",
      "default": "Shop Now",
      "label": "Button Text"
    }
  ]
}
</settings>

<!-- #endregion -->
<style lang="less" scoped>
.media-with-text {
  width: 1440px;
  gap: 56px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 300;
  box-sizing: border-box;
  @media @large-1280 {
    padding-left: 0px;
    padding-right: 0px;
    flex-direction: column;
  }
  .image-section-first {
    padding-top: 40px;
    padding-left: 218px;
    width: 480px;
    height: auto;
    align-self: baseline;
  }
  .image-section-first-M {
    display: none;
  }
  .image-section-second-M {
    display: none;
  }
  @media @tablet {
    width: 685px;
    // height: 808px;
    gap: 32px;
    flex-direction: row-reverse;
    .image-section-first-M {
      display: flex;
      width: 326px;
    }
    .image-section-first {
      display: none;
    }
    .image-section-second-M {
      display: flex;
      width: 261px;
      align-self: baseline;
      // padding-bottom: 379px;
    }
    // animation part
    .image-section-second-M {
      width: 261px;
      height: 415px;
      padding-top: 75px;
      overflow: hidden;
      position: relative;
      float: left;
      box-sizing: border-box;
    }
    .image-section-second-M picture {
        width: 100%;
      }
    .image-section-second-M ul {
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        position: relative;
        float: left;
      }
    .image-section-second-M ul li {
        display: inline-block;
        width: 25%;
        height: 340px;
        opacity: 0;
        // -webkit-transition: 300ms;
        transition: 600ms;
      }
    .image-section-second-M ul li:before {
        content: "";
        width: 0%;
        height: 2px;
        background: #000;
        position: absolute;
        bottom: 0;
        margin-left: 12.5%;
        -webkit-transition: 300ms;
        transition: 300ms;
        z-index: 2;
      }
    .image-section-second-M ul li:first-child {
        opacity: 1;
      }
    .image-section-second-M ul li:hover {
        opacity: 1;
      }
    .image-section-second-M ul li:hover:before {
        width: 25%;
        margin-left: 0%;
      }
    .image-section-second-M ul li picture {
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0px;
        left: 0;
        pointer-events: none;
      }
  }
  @media @mobile {
    width: 320px;
    flex-direction: column;
    .image-section-first-M {
      display: none;
    }
    .image-section-second-M {
      display: flex;
      width: 320px;
    }
    // animation part
    .image-section-second-M {
      overflow: hidden;
      position: relative;
      float: left;
      width: 100%;
      height: auto;
      box-sizing: border-box;
    }
    .image-section-second-M picture {
        width: 100%;
      }
    .image-section-second-M ul {
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        position: relative;
        float: left;
      }
    .image-section-second-M ul li {
        display: inline-block;
        width: 25%;
        height: 365px;
        opacity: 0;
        // -webkit-transition: 300ms;
        transition: 600ms;
      }
    .image-section-second-M ul li:before {
        content: "";
        width: 0%;
        height: 2px;
        background: #000;
        position: absolute;
        bottom: 0;
        margin-left: 12.5%;
        -webkit-transition: 300ms;
        transition: 300ms;
        z-index: 2;
      }
    .image-section-second-M ul li:first-child {
        opacity: 1;
      }
    .image-section-second-M ul li:hover {
        opacity: 1;
      }
    .image-section-second-M ul li:hover:before {
        width: 25%;
        margin-left: 0%;
      }
    .image-section-second-M ul li picture {
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0px;
        left: 0;
        pointer-events: none;
      }
  }
  &__content {
    padding-top: 40px;
    align-self: flex-start;
    text-align: left;
    display: flex;
    flex-direction: column;
    line-height: 35px;
    box-sizing: border-box;
    @media @tablet {
      padding-top: 32px;
      padding-left: 61px;
      .image-section-second {
        display: none;
      }
    }
    @media @mobile {
      padding-left: 0px;
      padding-top: 0px; 
    }
    .image-section-second {
          width: 320px;
          height: 418px;
          overflow: hidden;
          position: relative;
          float: left;
          // margin: 25px;
          box-sizing: border-box;
      }
    .image-section-second picture {
        width: 100%;
      }
    .image-section-second ul {
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        position: relative;
        float: left;
      }
    .image-section-second ul li {
        display: inline-block;
        width: 25%;
        height: 420px;
        opacity: 0;
        // -webkit-transition: 300ms;
        transition: 600ms;
      }
    .image-section-second ul li:before {
        content: "";
        width: 0%;
        height: 2px;
        background: #000;
        position: absolute;
        bottom: 0;
        margin-left: 12.5%;
        -webkit-transition: 300ms;
        transition: 300ms;
        z-index: 2;
      }
    .image-section-second ul li:first-child {
        opacity: 1;
      }
    .image-section-second ul li:hover {
        opacity: 1;
      }
    .image-section-second ul li:hover:before {
        width: 25%;
        margin-left: 0%;
      }
    .image-section-second ul li picture {
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0px;
        left: 0;
        pointer-events: none;
      }
    .image-section-second-M {
      display: none;
    }
    &--main {
      font-size: 32px;
      font-weight: 400;
      line-height: 36px;
      width: 488px;
      padding-top: 48px;
      color: @TextHeading;
      @media @tablet {
        font-size: 28px;
        line-height: 32px;
        width: 330px;
      }
      @media @mobile {
        padding-top: 0px;
        font-size: 28px;
        line-height: 32px;
        width: 287px;
      }
    }
    &--sub {
      padding-top: 16px;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      width: 488px;
      color: @TextBody;
      @media @tablet {
        font-size: 12px;
        line-height: 20px;
        width: 330px;
      }
      @media @mobile {
        padding-top: 8px;
        font-size: 12px;
        line-height: 20px;
        width: 287px;
      }
    }
    &--btn {
      .btn_main {
        background-color: @ButtonPrimary;
        color: @ButtonSecondary;
        width: 178px;
        height: 44px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        outline: none;
        border: none;
        font-size: 14px;
        line-height: 18px;
        font-weight: 700;
        cursor: pointer;
        padding: 10px;
        @media @tablet {
          width: 110px;
          font-size: 12px;
          height: 34px;
        }
        @media @mobile {
          width: 110px;
          font-size: 12px;
          height: 34px;
        }
      }
      .btn_main:hover, .btn_main:focus {
        background-color: white;
        color: black;
        border: 1px solid black;
        box-shadow: inset 0 -3.25em 0 0 white;
        transition: 0.45s;
      }
      padding-top: 40px;
      @media @mobile {
        padding-top: 32px;
      }
    }
  }
}
.mirror-on {
  flex-direction: row-reverse;
  padding-right: 198px;
  height: auto;
  .image-section-first-M {
    display: flex;
    width: 426px;
  }
  .image-section-first {
    display: none;
  }
  .image-section-second {
    display: none;
  }
  // animation part for mirror on
    .image-section-second-M {
      display: flex;
      width: 550px;
      align-self: baseline;
      overflow: hidden;
      position: relative;
      float: left;
      box-sizing: border-box;
      padding-top: 40px;
    }
    .image-section-second-M picture {
        width: 100%;
      }
    .image-section-second-M ul {
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        position: relative;
        float: left;
      }
    .image-section-second-M ul li {
        display: inline-block;
        width: 16.5%;
        height: 690px;
        opacity: 0;
        // -webkit-transition: 300ms;
        transition: 600ms;
      }
    .image-section-second-M ul li:before {
        content: "";
        width: 0%;
        height: 2px;
        background: #000;
        position: absolute;
        bottom: 0;
        margin-left: 12.5%;
        -webkit-transition: 300ms;
        transition: 300ms;
        z-index: 2;
      }
    .image-section-second-M ul li:first-child {
        opacity: 1;
      }
    .image-section-second-M ul li:hover {
        opacity: 1;
      }
    .image-section-second-M ul li:hover:before {
        width: 25%;
        margin-left: 0%;
      }
    .image-section-second-M ul li picture {
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0px;
        left: 0;
        pointer-events: none;
      }
  .media-with-text__content--main {
    width: 369px;
  }
  .media-with-text__content--sub {
    width: 437px;
  }
  @media @tablet {
    flex-direction: row;
    padding-right: 0px;
    padding-left: 61px;
    .image-section-first-M {
      display: flex;
      width: 326px;
    }
    .image-section-first {
      display: none;
    }
    .image-section-second {
      display: none;
    }
    .image-section-second-M {
      display: flex;
      width: 261px;
      align-self: baseline;
      padding-top: 75px;
    }
    .image-section-second-M ul li {
        display: inline-block;
        width: 25%;
        height: 359px;
        opacity: 0;
        // -webkit-transition: 300ms;
        transition: 600ms;
      }
    .media-with-text__content {
      padding-left: 0px;
    }
    .media-with-text__content--main {
      width: 330px;
    }
    .media-with-text__content--sub {
      width: 330px;
    }
  }
  
  @media @mobile {
    flex-direction: column-reverse;
    padding-left: 0px;
    gap: 24px;
    .image-section-first-M {
      display: none;
    }
    .image-section-second-M {
      display: flex;
      width: 320px;
      height: 420px;
      padding-top: 0px;
    }
    .media-with-text__content--main {
      width: 287px;
    }
    .media-with-text__content--sub {
      padding-top: 8px;
      width: 287px;
    }
  }
}
.media-with-text {
  position: relative;
}
</style>

<script>
import NoSSR from "vue-no-ssr";
import { isBrowser, isNode } from "browser-or-node";
import "video.js/dist/video-js.min.css";
import emergeImage from "../global/components/common/emerge-image.vue";
export default {
  data() {
    return {
      img: [],
      slug_val:"",
      img1:""
    };
  },
  methods: {
    fetchData(option) {
      this.$apiSDK.catalog.getProductDetailBySlug(option).then((data) => {
        this.slug_val = data.slug;
        this.img = [...data.medias];
        this.img1 = this.img[0].url;
      });
    }
  },
  props: ["settings", "apiSDK", "global_config"],
  computed: {},
  components: {
    "emerge-img": emergeImage,
    "no-ssr": NoSSR,
    videoPlayer: () => {
      return isBrowser
        ? Promise.resolve(require("vue-video-player/src/player"))
        : Promise.resolve({});
    },
  },
  directives: {},
  mounted() {
    let option = {
      slug: this.settings.props.Product.value,
    };
    this.fetchData(option);
  },
  beforeDestroy() {},
};
</script>