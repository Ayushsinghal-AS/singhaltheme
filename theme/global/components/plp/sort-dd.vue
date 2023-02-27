<template>
  <div class="items sort-list regular-sm font-body">
    <span class="dd-label font-body">Sort by:</span>
    <div class="selected" v-on:click="sortOpen = !sortOpen">
      <span class="selectedSort font-body"> {{ selectedsort }} </span>
      <svg-wrapper :svg_src="'arrow-dropdown-black'"></svg-wrapper>
      <ul v-if="sortOpen && checkMobile" class="menu" id="sortopt" v-click-outside="closeSortOption">
        <li v-for="(sorttype, index) in filteredsorts" :key="sorttype.value + index"
          v-on:click="updateSelection(sorttype.value)">
          <svg-wrapper v-if="!sorttype.is_selected" :svg_src="'regular'"></svg-wrapper>
          <svg-wrapper :svg_src="'radio-selected'" v-if="sorttype.is_selected"></svg-wrapper>
          <div class="font-body" :class="{selectedStyle: sorttype.is_selected}">{{ sorttype.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { isBrowser, isNode } from "browser-or-node";
import SvgWrapper from './../../../components/common/svg-wrapper.vue';

export default {
  name: "sort-dd",
  props: {
    filteredsorts: [],
    updateSelection: {},
  },
  components: {
    'svg-wrapper': SvgWrapper
  },
  data() {
    return {
      sortOpen: false,
    };
  },

  computed: {
    selectedsort() {
      let selectedFilter = this.filteredsorts.filter((x) => x.is_selected);
      if (selectedFilter.length > 0) {
        return selectedFilter[0].name;
      }
      if (selectedFilter.length === 0) {
        return this.filteredsorts[1].name;
      }
    },
    checkMobile() {
      if (isBrowser) {
        return window.innerWidth > 480;
      } else {
        return false;
      }
    },
  },
  methods: {
    closeSortOption(event) {
      if (event && event.target.id !== "sortopt") {
        this.sortOpen = false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
/deep/ .svgbox {
  color: @PrimaryColor;

  svg {
    fill: currentColor;
    stroke: currentColor;
  }
}

.items {
  .dd-label {
    // width: 100px;
    width: 65px;
  }

  .flex-center();
  // margin: auto;
  // width: 60%;
  border-right: 1px solid @Gray;
  position: relative;
  // padding: 0 10px;
  .user-select-none();

  .selected {
    cursor: pointer;
    // margin-left: 10px;
    // width: 280px;
    align-items: center;
    justify-content: flex-start;
    display: flex;
    .user-select-none();

    .selectedSort {
      width: max-content;
    }
  }

  &:last-child {
    border-right: none;
  }

  &:nth-last-child(2) {
    border-right: none;
  }

  .menu {
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.1);
    // background-color: @White;
    background-color: @Overlay;
    position: absolute;
    top: 32px;
    // z-index: @menu;
    z-index: 2;
    margin: auto;
    // left: 30%;
    left: 0%;
    // width: 209px;
    width: 155px;
    display: flex;
    gap: 12px;
    flex-direction: column;
    padding: 19px 27px;
    color: @TextBody;

    @media @mobile {
      left: 0px;
    }

    li {
      display: flex;
      align-items: center;
      gap: 7px;
      // padding: 5px 15px;

      .selectedStyle{
        color: @TextHeading;
        font-weight: 600;
      }
    }

    .share-meta {
      color: @Gray;
      padding: 5px 0px;
    }

    .share-links {
      border: none;
      margin: 10px 0px;
    }
  }

  &.sort-list {
    //styleName: desktop/B1 - 16 px;
    color: @TextHeading;
    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.02em;
    // text-align: left;
    width: max-content; //20230210

    .sort-icon {
      display: none;

      @media @mobile {
        display: flex;
      }
    }

    #sortopt {
      //styleName: Vsml, caption, label/Vsml body - 12px - Inter;
      font-family: Inter;
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0em;
      color: @TextBody;


      @media @mobile {
        display: none;
      }
    }

    @media @mobile {
      .selected {
        .selectedSort {
          display: none;
        }
      }

      .menu {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        li {
          padding: 18px;
          border-bottom: 1px solid @Gray;
          justify-content: center;

          .inline-svg {
            display: none;
          }
        }
      }
    }
  }
}
</style>
