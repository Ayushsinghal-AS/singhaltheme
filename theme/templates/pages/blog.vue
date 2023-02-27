<template>
  <div>
    <loading v-show="IntervalID" />
    <div v-show="!IntervalID" class="mainSection" :class='[global_config.props.anim_name]'>
      <div class="content1">
        <div class="blogHeading font-header">
          <p>{{ this.page_config.props.textH }}</p>
        </div>
        <div class="blogDesc font-body">
          <p>
            {{ this.page_config.props.textD }}
          </p>
        </div>
      </div>

      <fdk-blog>
        <template v-slot="{ fetchBlogs }">
          <fdk-infinite-scrolling @loadmore="loadmoreBlogs(fetchBlogs)" :loadingData="context.blogs.loading">
          {{ printData(blogs) }}
          <div class="content2">
            <fdk-link
              :link="`/blog/${getFirstBlog.slug}`"
              :title="getFirstBlog.title" v-if="getFirstBlog"
            >
              <div class="section1">
                <div class="photo">
                  <img :src="getFirstBlog.feature_image.secure_url" />
                </div>
                <div class="section1-text font-header">
                  <div class="section1-text-block font-body">
                    <p>{{ getFirstBlog.tags[0] }}</p>
                  </div>
                  <p>{{ getFirstBlog.title }}</p>
                </div>
              </div>
            </fdk-link>
            <div class="section2">
              <fdk-link
                :link="`/blog/${getSecondBlog.slug}`"
                :title="getSecondBlog.title" v-if="getSecondBlog"
              >
                <div class="subSection1">
                  <div class="photo">
                    <img :src="getSecondBlog.feature_image.secure_url" />
                  </div>
                  <div class="section2-text font-header">
                    <p>{{ getSecondBlog.title }}</p>
                  </div>
                </div>
              </fdk-link>
              <fdk-link
                :link="`/blog/${getThirdBlog.slug}`"
                :title="getThirdBlog.title" v-if="getThirdBlog"
              >
                <div class="subSection2">
                  <div class="photo">
                    <img :src="getThirdBlog.feature_image.secure_url" />
                  </div>
                  <div class="section2-text2 font-header">
                    <p>{{ getThirdBlog.title }}</p>
                  </div>
                </div>
              </fdk-link>
            </div>
          </div>
  
          <div class="content3" v-if="context.blogs && context.blogs.items">
            <div v-for="(items, i) in context.blogs.items.slice(3)" :key="i">
              <fdk-link :link= "`/blog/${items.slug}`" :title="items.title">
                <div class="column">
                  <div class="photo">
                    <img :src="items.feature_image.secure_url" />
                  </div>
                  <div class="sub-col-title font-header"><p>{{ items.title }}</p></div>
                </div> 
              </fdk-link>
            </div>
          </div>
        </fdk-infinite-scrolling>
        </template>
      </fdk-blog>
      <div :class="{ 'flexFull': global_config.props.anim_name == 'animFlex', }"></div>
    </div>
  </div>
</template>

<settings>
{
  "props": [
    {
      "type": "text",
      "id": "textH",
      "default": "",
      "label": "Heading"
    },
    {
      "type": "textarea",
      "id": "textD",
      "default": "",
      "label": "Subheading"
    }
  ]
}
</settings>

<style lang="less" scoped>
.content1 {
  .blogHeading {
    padding-top: 40px;
    padding-left: 72px;
    width: 150px;
    height: 36px;
    color: @TextHeading;
    font-weight: 400;
    font-size: 32px;
    line-height: 36px;
    @media @tablet {
      padding-left: 0px;
      font-size: 28px;
      line-height: 32px;
      width: unset;
      height: unset;
    }
    @media @mobile {
      font-size: 28px;
      line-height: 32px;
      width: unset;
      padding-left: 0px;
      height: unset;
    }
  }
  .blogDesc {
    padding-left: 72px;
    padding-top: 6px;
    color: @TextBody;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    width: 1296px;
    height: 22px;
    @media @tablet {
      padding-left: 0px;
      font-size: 14px;
      line-height: 22px;
      width: fit-content;
      height: unset;
    }
    @media @mobile {
      padding-left: 0px;
      font-size: 14px;
      line-height: 20px;
      width: 300px;
      height: unset;
    }
  }
}
.content2 {
  display: flex;
  padding-top: 32px;
  padding-left: 72px;
  .section1 {
    .photo {
      width: 100%;
      height: auto;
      overflow: hidden;
      img {
        width: 100%;
        height: auto;
        aspect-ratio: 1/1;
        object-fit: cover;
        transition: transform 0.35s;
        @media @mobile {
          aspect-ratio: 16/9;
        }
      }
    }
    .photo:hover img {
      transform: scale(1.1);
    }
    .section1-text {
      width: 689px;
      height: 93px;
      color: @TextHeading;
      background-color: #e8d7c6;
      font-weight: 400;
      font-size: 24px;
      line-height: 28px;
      p {
        padding-top: 28px;
        padding-bottom: 16px;
        padding-left: 16px;
        padding-right: 16px;
        @media @tablet {
          padding-top: 8px;
        }
      }
      .section1-text-block {
        width: fit-content;
        height: 35px;
        color: @TextBody;
        background-color: #9e856c;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        p {
          padding-top: 8px;
          padding-bottom: 8px;
          padding-left: 12px;
          padding-right: 12px;
        }
        @media @tablet {
          p {
            font-size: 12px;
          }
        }
        @media @mobile {
          p {
            font-size: 12px;
          }
        }
      }
      @media @tablet {
        width: 378px;
        height: 75px;
        p {
          font-size: 20px;
          line-height: 24px;
        }
      }
      @media @mobile {
        width: 100%;
        p {
          font-size: 20px;
          line-height: 24px;
        }
      }
    }
  }
  .section2 {
    padding-left: 40px;
    .subSection1 {
      .photo {
        overflow: hidden;
        width: 100%;
        height: auto;
        img {
          transition: transform 0.35s;
          width: 100%;
          height: auto;
          aspect-ratio: 16/9;
          object-fit: cover;
        }
      }
      .photo:hover img {
        transform: scale(1.1);
      }
      .section2-text {
        width: 567px;
        height: 58px;
        background-color: #e8d7c6;
        color: @TextHeading;
        font-weight: 400;
        font-size: 24px;
        line-height: 28px;
        p {
          padding-top: 16px;
          padding-bottom: 24px;
          padding-left: 16px;
          padding-right: 16px;
        }
        @media @tablet {
          width: 100%;
          height: unset;
          p {
            font-size: 20px;
            line-height: 24px;
          }
        }
        @media @mobile {
          width: 100%;
          p {
            font-size: 20px;
            line-height: 24px;
          }
        }
      }
    }
    .subSection2 {
      padding-top: 25px;
      .photo {
        overflow: hidden;
        width: 100%;
        height: auto;
        img {
          transition: transform 0.35s;
          width: 100%;
          height: auto;
          aspect-ratio: 16/9;
          object-fit: cover;
        }
      }
      .photo:hover img {
        transform: scale(1.1);
      }
      .section2-text2 {
        width: 567px;
        height: 58px;
        background-color: #e8d7c6;
        color: @TextHeading;
        font-weight: 400;
        font-size: 24px;
        line-height: 28px;
        p {
          padding-top: 16px;
          padding-bottom: 24px;
          padding-left: 16px;
          padding-right: 16px;
        }
        @media @tablet {
          width: 100%;
          height: unset;
          p {
            font-size: 20px;
            line-height: 24px;
          }
        }
        @media @mobile {
          width: 100%;
          p {
            font-size: 20px;
            line-height: 24px;
          }
        }
      }
    }
    @media @tablet {
      padding-left: 0px;
    }
    @media @mobile {
      padding-left: 0px;
      padding-top: 32px;
    }
  }
  @media @tablet {
    padding-left: 0px;
    padding-right: 0px;
    gap: 28px;
  }
  @media @mobile {
    padding-right: 0px;
    padding-left: 0px;
    flex-direction: column;
  }
}
.content3 {
  padding-top: 32px;
  padding-left: 72px;
  display: grid;
  grid-template-columns: auto auto auto;
  width: fit-content;
  gap: 32px;
  .column {
    .photo {
      overflow: hidden;
      width: 100%;
      height: auto;
      img {
        transition: transform 0.35s;
        width: 100%;
        height: auto;
        aspect-ratio: 16/9;
        object-fit: cover;
        @media @tablet {
          width: 212px;
          height: 119px;
        }
        @media @mobile {
          width: 136px;
          height: 76px;
        }
      }
      @media @tablet {
        width: 212px;
        height: 119px;
      }
      @media @mobile {
        width: 136px;
        height: 76px;
      }
    }
    .photo:hover img {
      transform: scale(1.1);
    }
    .sub-col-title {
      color: @TextHeading;
      font-weight: 400;
      font-size: 24px;
      line-height: 28px;
      width: 410px;
      padding-top: 20px;
      @media @tablet {
        width: fit-content;
        height: unset;
        font-size: 20px;
        line-height: 24px;
      }
      @media @mobile {
        padding-left: 16px;
        width: 139px;
        height: 50px;
        font-size: 20px;
        line-height: 24px;
        margin-top: -23px;
      }
    }
    @media @mobile {
      display: flex;
      padding-top: 32px;
    }
  }
  @media @tablet {
    padding-left: 0px;
    gap: 21px;
  }
  @media @mobile {
    display: flex;
    flex-direction: column;
    gap: unset;
    padding-top: 0px;
  }
}
.mainSection {
  max-width: 1361px;
  padding-left: 39.5px;
  padding-right: 39.5px;
  position: relative;
  @media @tablet {
    max-width: 665px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 0px;
    padding-right: 0px;
  }
  @media @mobile {
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>

<script>
import Loading from "./../../global/components/common/loading.vue";

export default {
  props: ["context", "settings", "page_config"],
  components: {
    loading: Loading,
  },
  data() {
    return {
      data: [],
      items: [],
      IntervalID: true,

    };
  },
  computed: {
    getFirstBlog() {
      return this.context?.blogs?.items?.[0];
    },
    getSecondBlog() {
      return this.context?.blogs?.items?.[1];
    },
    getThirdBlog() {
      return this.context?.blogs?.items?.[2];
    }
  },
  methods: {
    printData(data) {},
    loadmoreBlogs(fetchBlogs){
      if(this.context.blogs.page.has_next) {
        fetchBlogs({ pageNo: this.context.blogs.page.current+1});
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.IntervalID = false;
    }, 2000);
  },
};
</script>


