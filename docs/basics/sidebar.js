const { title } = require("../.vuepress/config");

module.exports = [
  {
    title: "Java",
    collapsable: true,
    children: [
      { title: "Chapter01_基础", path: "/basics/notes/Chapter01_基础" },
      { title: "Chapter02_数据类型", path: "/basics/notes/Chapter02_数据类型" },
      { title: "Chapter03_运算符和进制", path: "/basics/notes/Chapter03_运算符和进制" },
      { title: "Chapter04_控制结构", path: "/basics/notes/Chapter04_控制结构" },
      { title: "Chapter05_数组", path: "/basics/notes/Chapter05_数组" },
      { title: "Chapter06_类", path: "/basics/notes/Chapter06_类" },
      { title: "Chapter07_成员方法", path: "/basics/notes/Chapter07_成员方法" },
      { title: "Chapter08_OOP", path: "/basics/notes/Chapter08_OOP" },
      { title: "Chapter09_接口", path: "/basics/notes/Chapter09_接口" },
      { title: "Chapter10_枚举", path: "/basics/notes/Chapter10_枚举" },
      { title: "Chapter11_异常", path: "/basics/notes/Chapter11_异常" },
      { title: "Chapter12_包装类和String", path: "/basics/notes/Chapter12_包装类和String" },
      { title: "Chapter13_集合", path: "/basics/notes/Chapter13_集合" },
      { title: "Chapter14_泛型", path: "/basics/notes/Chapter14_泛型" },
      { title: "Chapter15_线程", path: "/basics/notes/Chapter15_线程" },
      { title: "Chapter16_IO流", path: "/basics/notes/Chapter16_IO流" },
      { title: "Chapter17_网络", path: "/basics/notes/Chapter17_网络" },
      { title: "Chapter18_反射", path: "/basics/notes/Chapter18_反射" },
    ],
  },

  {
    title: "其他",
    collapsable: true,
    children: [
      { title: "正则表达式", path: "/basics/正则表达式" },
      { title: "Git", path: "/basics/Git" },
      { title: "Java8新特性", path: "/basics/Java8新特性" },
      { title: "快捷键", path: "/basics/快捷键和快速输入" },
    ],
  },

];
