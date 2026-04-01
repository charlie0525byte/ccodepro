/**
 * 二叉排序树 (BST) 测试脚本
 * 运行方式: node bst-test.js
 */

// ========== 核心类定义 ==========

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            this.root = newNode;
            return { success: true, message: `插入根节点: ${value}` };
        }
        return this._insertNode(this.root, newNode);
    }

    _insertNode(node, newNode) {
        if (newNode.value === node.value) {
            return { success: false, message: `值 ${newNode.value} 已存在` };
        }
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
                return { success: true, message: `插入 ${newNode.value} 到 ${node.value} 的左子树` };
            }
            return this._insertNode(node.left, newNode);
        } else {
            if (node.right === null) {
                node.right = newNode;
                return { success: true, message: `插入 ${newNode.value} 到 ${node.value} 的右子树` };
            }
            return this._insertNode(node.right, newNode);
        }
    }

    search(value) {
        return this._searchNode(this.root, value, []);
    }

    _searchNode(node, value, path) {
        if (node === null) {
            return { found: false, path: path, message: `未找到 ${value}` };
        }
        path.push(node.value);
        if (value === node.value) {
            return { found: true, path: path, message: `找到 ${value}` };
        }
        if (value < node.value) {
            return this._searchNode(node.left, value, path);
        }
        return this._searchNode(node.right, value, path);
    }

    delete(value) {
        const result = { success: false, message: '' };
        this.root = this._deleteNode(this.root, value, result);
        return result;
    }

    _deleteNode(node, value, result) {
        if (node === null) {
            result.message = `未找到 ${value}`;
            return null;
        }
        if (value < node.value) {
            node.left = this._deleteNode(node.left, value, result);
            return node;
        }
        if (value > node.value) {
            node.right = this._deleteNode(node.right, value, result);
            return node;
        }
        result.success = true;
        result.message = `删除 ${value} 成功`;

        if (node.left === null && node.right === null) {
            return null;
        }
        if (node.left === null) {
            return node.right;
        }
        if (node.right === null) {
            return node.left;
        }
        const minRight = this._findMin(node.right);
        node.value = minRight.value;
        node.right = this._deleteNode(node.right, minRight.value, { success: true, message: '' });
        return node;
    }

    _findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    inorder() {
        const result = [];
        this._inorder(this.root, result);
        return result;
    }

    _inorder(node, result) {
        if (node !== null) {
            this._inorder(node.left, result);
            result.push(node.value);
            this._inorder(node.right, result);
        }
    }

    preorder() {
        const result = [];
        this._preorder(this.root, result);
        return result;
    }

    _preorder(node, result) {
        if (node !== null) {
            result.push(node.value);
            this._preorder(node.left, result);
            this._preorder(node.right, result);
        }
    }

    postorder() {
        const result = [];
        this._postorder(this.root, result);
        return result;
    }

    _postorder(node, result) {
        if (node !== null) {
            this._postorder(node.left, result);
            this._postorder(node.right, result);
            result.push(node.value);
        }
    }

    getDepth() {
        return this._getDepth(this.root);
    }

    _getDepth(node) {
        if (node === null) return 0;
        return 1 + Math.max(this._getDepth(node.left), this._getDepth(node.right));
    }
}

// ========== 测试框架 ==========

let passCount = 0;
let failCount = 0;

function assert(condition, testName) {
    if (condition) {
        console.log(`  ✅ ${testName}`);
        passCount++;
    } else {
        console.log(`  ❌ ${testName}`);
        failCount++;
    }
}

function assertEqual(actual, expected, testName) {
    const condition = JSON.stringify(actual) === JSON.stringify(expected);
    if (!condition) {
        console.log(`     实际: ${JSON.stringify(actual)}`);
        console.log(`     期望: ${JSON.stringify(expected)}`);
    }
    assert(condition, testName);
}

function describe(suiteName, fn) {
    console.log(`\n📋 ${suiteName}`);
    fn();
}

// ========== 测试用例 ==========

describe('插入操作', () => {
    const bst = new BinarySearchTree();

    assertEqual(bst.insert(50), { success: true, message: '插入根节点: 50' }, '插入根节点');
    assertEqual(bst.insert(30), { success: true, message: '插入 30 到 50 的左子树' }, '插入左子节点');
    assertEqual(bst.insert(70), { success: true, message: '插入 70 到 50 的右子树' }, '插入右子节点');
    assertEqual(bst.insert(30), { success: false, message: '值 30 已存在' }, '重复插入应失败');
});

describe('查找操作', () => {
    const bst = new BinarySearchTree();
    [50, 30, 70, 20, 40, 60, 80].forEach(v => bst.insert(v));

    const result1 = bst.search(40);
    assert(result1.found, '查找存在的节点');
    assertEqual(result1.path, [50, 30, 40], '查找路径正确');

    const result2 = bst.search(100);
    assert(!result2.found, '查找不存在的节点');
    assertEqual(result2.path, [50, 70, 80], '查找路径记录正确');
});

describe('遍历操作', () => {
    const bst = new BinarySearchTree();
    [50, 30, 70, 20, 40, 60, 80].forEach(v => bst.insert(v));

    assertEqual(bst.inorder(), [20, 30, 40, 50, 60, 70, 80], '中序遍历（升序）');
    assertEqual(bst.preorder(), [50, 30, 20, 40, 70, 60, 80], '前序遍历');
    assertEqual(bst.postorder(), [20, 40, 30, 60, 80, 70, 50], '后序遍历');
});

describe('删除操作 - 叶子节点', () => {
    const bst = new BinarySearchTree();
    [50, 30, 70].forEach(v => bst.insert(v));

    const result = bst.delete(30);
    assert(result.success, '删除叶子节点成功');
    assertEqual(bst.inorder(), [50, 70], '删除后中序遍历正确');
});

describe('删除操作 - 单子节点', () => {
    const bst = new BinarySearchTree();
    [50, 30, 70, 20].forEach(v => bst.insert(v));

    const result = bst.delete(30);
    assert(result.success, '删除单子节点成功');
    assertEqual(bst.inorder(), [20, 50, 70], '删除后中序遍历正确');
});

describe('删除操作 - 双子节点', () => {
    const bst = new BinarySearchTree();
    [50, 30, 70, 20, 40, 60, 80].forEach(v => bst.insert(v));

    const result = bst.delete(70);
    assert(result.success, '删除双子节点成功');
    assertEqual(bst.inorder(), [20, 30, 40, 50, 60, 80], '删除后中序遍历正确');
});

describe('删除操作 - 根节点', () => {
    const bst = new BinarySearchTree();
    [50, 30, 70].forEach(v => bst.insert(v));

    bst.delete(50);
    assertEqual(bst.inorder(), [30, 70], '删除根节点后中序遍历正确');
});

describe('删除操作 - 不存在的节点', () => {
    const bst = new BinarySearchTree();
    [50, 30, 70].forEach(v => bst.insert(v));

    const result = bst.delete(100);
    assert(!result.success, '删除不存在的节点应失败');
    assertEqual(bst.inorder(), [30, 50, 70], '树结构不变');
});

describe('树的深度', () => {
    const bst = new BinarySearchTree();
    assertEqual(bst.getDepth(), 0, '空树深度为0');

    bst.insert(50);
    assertEqual(bst.getDepth(), 1, '单节点深度为1');

    [30, 70, 20, 40].forEach(v => bst.insert(v));
    assertEqual(bst.getDepth(), 3, '多层树深度正确');
});

describe('边界情况', () => {
    const bst = new BinarySearchTree();

    // 空树操作
    assertEqual(bst.inorder(), [], '空树中序遍历返回空数组');
    assertEqual(bst.search(1).found, false, '空树查找返回false');

    // 顺序插入（最坏情况）
    const bst2 = new BinarySearchTree();
    [1, 2, 3, 4, 5].forEach(v => bst2.insert(v));
    assertEqual(bst2.inorder(), [1, 2, 3, 4, 5], '顺序插入遍历正确');
    assertEqual(bst2.getDepth(), 5, '顺序插入深度为n');
});

describe('复杂操作序列', () => {
    const bst = new BinarySearchTree();

    // 插入 10 个节点
    [50, 30, 70, 20, 40, 60, 80, 10, 25, 35].forEach(v => bst.insert(v));
    assertEqual(bst.inorder().length, 10, '插入10个节点');

    // 删除 3 个节点
    bst.delete(20);
    bst.delete(70);
    bst.delete(50);
    assertEqual(bst.inorder().length, 7, '删除后剩余7个节点');

    // 验证剩余节点
    const remaining = bst.inorder();
    assert(remaining.includes(30), '节点30仍存在');
    assert(!remaining.includes(50), '节点50已删除');
});

// ========== 测试结果汇总 ==========

console.log('\n' + '='.repeat(50));
console.log(`测试结果: ✅ ${passCount} 通过, ❌ ${failCount} 失败`);
console.log('='.repeat(50));

process.exit(failCount > 0 ? 1 : 0);
