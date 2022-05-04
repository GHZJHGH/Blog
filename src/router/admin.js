import H from "@/views/admin/Home";
import Main from "@/views/admin/Main";
import user from "@/views/admin/nav1/user";
import category from "@/views/admin/nav1/category";
import tag from "@/views/admin/nav1/tag";

import echart from "@/views/admin/charts/echarts";
import publishCounts from "@/views/admin/charts/publishCounts";
import viewCounts from "@/views/admin/charts/viewCounts";

let routes = [
  {
    path: "/H",
    component: H,
    name: "管理",
    iconCls: "el-icon-message", //图标样式class
    hidden: true,
    children: [
      { path: "/user", component: user, name: "用户" },
      { path: "/category", component: category, name: "分类" },
      { path: "/tag", component: tag, name: "标签" }
    ]
  },
  {
    path: "/H",
    component: H,
    name: "统计",
    iconCls: "fa fa-bar-chart",
    hidden: true,
    children: [
      // { path: '/echart', component: echart, name: 'example' },
      { path: "/publishcounts", component: viewCounts, name: "浏览量" },
      { path: "/viewCounts", component: publishCounts, name: "发布量" }
    ]
  }
  // {
  //   path: '/H',
  //   component: H,
  //   name: '导航二',
  //   iconCls: 'fa fa-id-card-o',
  //   hidden: true,
  //   children: [
  //     { path: '/page5', component: Page5, name: '页面5' }
  //   ]
  // },
  // {
  //   path: '/H',
  //   component: H,
  //   name: '',
  //   iconCls: 'fa fa-address-card',
  //   leaf: true,//只有一个节点
  //   hidden: true,
  //   children: [
  //     { path: '/page6', component: Page6, name: '导航三' }
  //   ]
  // },
];
export default routes;
