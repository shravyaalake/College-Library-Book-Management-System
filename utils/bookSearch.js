class TreeNode {
  constructor(book) {
    this.book = book;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(book) {
    const newNode = new TreeNode(book);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    this.insertNode(this.root, newNode);
  }

  insertNode(node, newNode) {
    if (newNode.book.title < node.book.title) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  search(title) {
    return this.searchNode(this.root, title);
  }

  searchNode(node, title) {
    if (!node) return null; 
    if (title === node.book.title) return node.book; 
    return title < node.book.title 
      ? this.searchNode(node.left, title) 
      : this.searchNode(node.right, title);
  }

  inOrderTraversal(node, result = []) {
    if (node) {
      this.inOrderTraversal(node.left, result);
      result.push(node.book);
      this.inOrderTraversal(node.right, result);
    }
    return result;
  }

  delete(title) {
    this.root = this.deleteNode(this.root, title);
  }

  deleteNode(node, title) {
    if (!node) return null;

    if (title < node.book.title) {
      node.left = this.deleteNode(node.left, title);
      return node;
    } else if (title > node.book.title) {
      node.right = this.deleteNode(node.right, title);
      return node;
    } else { 
      if (!node.left && !node.right) return null; 
      if (!node.left) return node.right; 
      if (!node.right) return node.left;

      const minLargerNode = this.findMin(node.right); 
      node.book = minLargerNode.book; 
      node.right = this.deleteNode(node.right, minLargerNode.book.title); 
      return node;
    }
  }

  findMin(node) {
    while (node.left) node = node.left;
    return node;
  }
}

module.exports = BinarySearchTree;
