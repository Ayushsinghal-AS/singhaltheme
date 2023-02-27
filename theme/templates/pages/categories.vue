<template>
  <div class="section-margin-db">
    <plp-loader v-if="context && context.categories && context.categories.loading"></plp-loader>
    <template v-else-if="context && context.categories && context.categories.allsecondchilds.length > 0">
      <div class="card-container">
        <div class="top-items">
          <div class="title-block">
            <div class="section-heading fontHead font-header">
              <div v-if="page_config && page_config.props.heading">
                {{ page_config.props.heading }}
              </div>
              <div v-if="page_config.props.pCount" class="count_head font-body">
                ({{ context.categories.allsecondchilds.length }})
              </div>
            </div>
          </div>
          <div class="sub-title-block">
            <div class="fontSub font-body">
              {{ page_config.props.subheading }}
            </div>
          </div>

          <div class="grp_list_wrap_adv">
            <div class="grp_card_adv" style="padding-bottom: 48px;">
              <div class="card_item_adv" v-for="card in filterProducts8" :key="card">
                <fdk-link :action="card.action">
                  <div class="item_img">
                    <div class="card_img"><img :src="card.banners.portrait.url" /></div>
                  </div>
                  <div class="item_txt">{{ card.name }}</div>
                </fdk-link>
              </div>
            </div>
            <banner-db v-if="getPageConfigById('image1') && getPageConfigById('image2')"
              :bnr_img1="getPageConfigById('image1')" :bnr_img2="getPageConfigById('image2')"
              :bnr_head="getPageConfigById('bHead')" :bnr_subhead="getPageConfigById('bSubHead')"
              :btn_txt="getPageConfigById('button_text')" :btn_link="getPageConfigById('button_link')" />
            <div class="grp_card_adv"  style="padding-top: 48px;">
              <div class="card_item_adv" v-for="card in filterProducts8plus" :key="card">
                <fdk-link :action="card.action">
                  <div class="item_img">
                    <div class="card_img"><img :src="card.banners.portrait.url" /></div>
                  </div>
                  <div class="item_txt font-body">{{ card.name }}</div>
                </fdk-link>
              </div>
            </div>
          </div>


          <!-- <fdk-infinite-loading>
                <template slot-scope="infiniteLoaderData">
                  <div class="grp_list_wrap_adv">
                    <div class="grp_card_adv">
                      <div class="card_item_adv" v-for="card in context.categories.allsecondchilds" :key="card">
                        <fdk-link :action="card.action">
                          <div class="item_img">
                            <div class="card_img"><img :src="card.banners.portrait.url" /></div>
                          </div>
                          <div class="item_txt">{{ card.name }}</div>
                        </fdk-link>
                      </div>
                    </div>
                    <fdk-loader id="loader" class="loader-center" v-if="infiniteLoaderData.hasNext"></fdk-loader>
                  </div>
                </template>
              </fdk-infinite-loading> -->




        </div>
        <back-to-top-db v-if="page_config.props.back2top" class="b2top" />
      </div>
    </template>
    <fdk-empty-state v-else-if="
      context &&
      context.categories &&
      context &&
      !context.categories.loading &&
      context.categories.allsecondchilds.length === 0 &&
      isMounted
    " :title="'No Categories found'"></fdk-empty-state>
  </div>
</template>
<!-- #region  -->
<settings>
  {
    "props": [
        {
          "type": "checkbox",
          "id": "pCount",
          "label": "Show count",
          "default": true,
          "info": "Check to "
        },
        {
          "type": "checkbox",
          "id": "InfScroll",
          "label": "Enable infinity scroll",
          "default": true,
          "info": "Check to "
        },
        {
          "type": "checkbox",
          "id": "back2top",
          "label": "Back to top button",
          "default": true,
          "info": "Check to "
        },
        {
          "type": "text",
          "id": "heading",
          "default": "Categories",
          "label": "Heading",
          "info":"Heading text of the section "
        },
        {
          "type": "text",
          "id": "subheading",
          "default": "Style solutions that are both flattering and functional for every occasion, whether it is on-duty or off-duty.",
          "label": "Page description",
          "info":" Shot description text below the heading on UI"
        },
        {
            "type": "image_picker",
            "id": "image1",
            "default": "",
            "label": "Image 1",
            "info": "Pls attach Image"
        },
        {
            "type": "image_picker",
            "id": "image2",
            "default": "",
            "label": "Image 2",
            "info": "Pls attach Image"
        },
        {
            "type": "text",
            "id": "bHead",
            "default": "Explore Our Outfits",
            "label": "Banner Heading"
        },
        {
            "type": "text",
            "id": "bSubHead",
            "default": "Curated list of our best outfit combinations designed by Vastrakala experts",
            "label": "Banner Subheading"
        },
        {
            "type": "text",
            "id": "button_text",
            "default": "Read article",
            "label": "Button Text"
       },
       {
            "type": "url",
            "id": "button_link",
            "default": "",
            "label": "Button Link"
       }
    ]
}

</settings>
<!-- #endregion -->
<script>
import groupList from "./../../global/components/group-list.vue";
import { detectMobileWidth } from "../../helper/utils";
import placeholderImage from "./../../assets/images/placeholder.png";
import emergeImage from "./../../global/components/common/emerge-image.vue";
import plpLoader from "./../../global/components/common/loading.vue"
import bannerDB from "./../../global/components/plp/banner-db";
import backToTopDB from "./../../global/components/plp/back-to-top-db";



export default {
  props: {},
  data() {
    return {
      categories: [],
      isMounted: false,
      isLoading: false,
    };
  },
  components: {
    "group-list": groupList,
    "emerge-image": emergeImage,
    "plp-loader": plpLoader,
    "banner-db": bannerDB,
    "back-to-top-db": backToTopDB,


  },

  watch: {
    settings: function (newVal, oldVal) { },
  },
  mounted() {
    this.isMounted = true;
    console.log("asd", this.context.categories);
  },
  methods: {
    getPageConfigById(id) {
      return this.page_config?.props?.[id] || "";
    },
    detectMobileWidth,
    replaceByDefault(e) {
      e.target.src = placeholderImage;
    },
    printConsole(dataa) {
      console.log("printclg", dataa);
    },
  },
  computed: {
    filterProducts8: function () {
      return this.context.categories.allsecondchilds.filter((item, index) => index < 8)
    },
    filterProducts8plus: function () {
      return this.context.categories.allsecondchilds.filter((item, index) => index >= 8)
    },
  }
};
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
  display: none;
}

.card-container {
  margin: 0;
  position: relative;
}

.top-items {
  // padding: 14px;
  border-radius: @border-radius;
  background: transparent;
  // margin: 10px 0 0 0;
}

.title-block {
  display: flex;
  text-transform: uppercase;
  text-align: center;
  box-sizing: border-box;
  position: relative;
  max-width: @page-width;
  //.margin-0-auto();

  >div {
    flex: 0 0 100%;
  }
}

.text-spacing {
  margin: 1px 0 15px 0;
}

// display: flex;
// justify-content: space-between;
// color: #41434c;
// text-transform: uppercase;
.title {
  font-weight: 700;
  font-size: 18px;

  @media @mobile {
    font-size: 14px;
  }
}

@media @mobile {
  /deep/ .item {
    width: 100% !important;
    margin-bottom: 20px;

    &:not(:nth-child(2n + 0)) {
      margin-right: 19px !important;
    }
  }
}

.grp_card_adv {
  background-color: @PageBackground;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  grid-template-rows: 1fr;
  grid-gap: 48px 24px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 480px) {
    grid-gap: 32px 12px;
  }
}

.card_img>img {
  width: 100%;
  aspect-ratio: 0.75;
}

.fontSub {
  color: @TextBody;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.02em;
  text-align: left;
  margin-bottom: 24px;

  @media screen and (max-width: 480px) {
    //styleName: Mobile/B2 - 12px;
    font-family: Inter;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: -0.02em;
    text-align: left;
    margin-bottom: 16px;
  }


}

.fontHead {
  display: flex;
  gap: 8px;
  align-items: baseline;
  color: @TextHeading;
  //styleName: desktop/H2 - 32px Marcellus;
  font-family: Marcellus;
  font-size: 32px;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: -0.02em;
  text-align: left;
  margin-bottom: 8px;

  @media screen and (max-width: 480px) {
    //styleName: Mobile/H2 - 28 px Marcellus;
    font-family: Marcellus;
    font-size: 28px;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: -0.02em;
    text-align: left;
  }
}

.count_head {

  color: @TextLabel;
  //styleName: desktop/B1 - 16 px;
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.02em;
  text-align: left;

}


.item_txt {
  margin-top: 16px; //dtm
  //styleName: desktop/Sub H6 - 16px - Inter;
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.02em;
  text-align: left;


  @media screen and (max-width: 480px) {
    //styleName: Mobile/Sub H6- 14px Medium;
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: -0.02em;
    text-align: left;

  }
}
</style>
