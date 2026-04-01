# 二叉排序树 (BST) 可视化文档

## 概述

本项目实现了一个交互式的二叉排序树（Binary Search Tree）可视化程序，可在浏览器中直接运行。

## 文件结构

```
ccodepro/
├── bst-visualization.html   # 主程序文件（HTML + CSS + JS）
├── BST_API.md               # API 文档
├── bst-test.js              # Node.js 测试脚本
└── README.md                # 项目说明
```

## 快速开始

1. 下载 `bst-visualization.html` 文件
2. 用现代浏览器（Chrome/Firefox/Safari）直接打开
3. 无需任何服务器或依赖

## 核心类说明

### TreeNode 类

二叉树节点类，存储单个节点信息。

```javascript
class TreeNode {
    constructor(value) {
        this.value = value;  // 节点值
        this.left = null;    // 左子节点
        this.right = null;   // 右子节点
        this.x = 0;          // 可视化 X 坐标
        this.y = 0;          // 可视化 Y 坐标
    }
}
```

### BinarySearchTree 类

二叉排序树主类，提供所有核心操作。

#### 构造函数

```javascript
const bst = new BinarySearchTree();
```

#### 方法列表

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `insert(value)` | number | `{success, message}` | 插入节点 |
| `delete(value)` | number | `{success, message}` | 删除节点 |
| `search(value)` | number | `{found, path, message}` | 查找节点 |
| `inorder()` | - | number[] | 中序遍历（升序） |
| `preorder()` | - | number[] | 前序遍历 |
| `postorder()` | - | number[] | 后序遍历 |
| `getDepth()` | - | number | 获取树深度 |

### TreeVisualizer 类

树可视化渲染类。

#### 方法列表

| 方法 | 说明 |
|------|------|
| `draw(tree)` | 绘制二叉树 |
| `setHighlightPath(path)` | 设置高亮路径 |
| `clearHighlight()` | 清除高亮 |

## 操作时间复杂度

| 操作 | 平均情况 | 最坏情况 |
|------|----------|----------|
| 插入 | O(log n) | O(n) |
| 删除 | O(log n) | O(n) |
| 查找 | O(log n) | O(n) |

> 最坏情况发生在树退化为链表时（如顺序插入）。

## 使用示例

### 网页中使用

```html
<script>
    const bst = new BinarySearchTree();

    // 插入节点
    bst.insert(50);
    bst.insert(30);
    bst.insert(70);

    // 查找节点
    const result = bst.search(30);
    console.log(result.found);  // true
    console.log(result.path);   // [50, 30]

    // 中序遍历
    console.log(bst.inorder()); // [30, 50, 70]

    // 删除节点
    bst.delete(30);
</script>
```

### Node.js 中使用（需提取 JS 部分）

```javascript
// 提取 TreeNode 和 BinarySearchTree 类后
const bst = new BinarySearchTree();
[50, 30, 70, 20, 40].forEach(v => bst.insert(v));
console.log(bst.inorder()); // [20, 30, 40, 50, 70]
```

## 删除操作详解

删除节点分三种情况：

1. **叶子节点**：直接删除
2. **单子节点**：用子节点替换
3. **双子节点**：用右子树最小值替换

```
删除前:        删除 50 后:
    50             60
   /  \           /  \
  30   70   →    30   70
 / \   /        / \    \
20 40 60       20  40   80
      \
      80
```

## 运行测试

```bash
node bst-test.js
```

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+
