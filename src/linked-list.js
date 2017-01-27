const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        const node = new Node(data);
        if (!this.length) {
            this._head = node;
            this._tail = node;

        }
        else {
            node.prev = this._tail;
            this._tail = node;
            node.prev.next = node;
        }
        this.length++;
        return this;
    }

    head() {
        return (this.length) ? this._head.data : null;
    }

    tail() {
        return (this.length) ? this._tail.data : null;
    }

    at(index) {
        var current = this._head;
        var i = 0;
        while (i < index) {
            current = current.next;
            i++;
        }
        return current.data;
    }

    insertAt(index, data) {
        if (index < 0 || index > this.length)
            throw new RangeError('Parameter must be between 0 and ' + this.length);

        else if (index == 0 || index == this.length)
            this.append(data);

        else {
            const node = new Node(data);
            var current = this._head;
            var previous = current.prev;
            var i = 0;
            while (i < index) {
                current = current.next;
                previous = current.prev;
                i++;
            }
            previous.next = node;
            node.next = current;
            node.prev = previous;
            current.prev = node;
        }
        this.length++;
        return this;
    }

    isEmpty() {
        return !this.length;
    }

    clear() {
        this.length = 0;
        this._head = null;
        this._tail = null;
        return this;
    }

    deleteAt(index) {
        var current = this._head;
        if (index < 0 || index >= this.length) {
            throw new RangeError('Parameter must be between 0 and ' + this.length - 1);
        }

        else if (index == 0) {
            this._head = current.next;
            if (!this._head)
                this._tail = null;
            else
                this._head.prev = null;
        }

        else if (index == this.length - 1) {
            this._tail = current.prev;
            this._tail.next = null;
        }

        else {
            var i = 0;
            while (i++ < index)
                current = current.next;
            current.prev.next = current.next;
        }
        this.length--;
        return this;
    }

    reverse() {
        var current = this._head,
            temp;
        var flag = true;
        while (current) {
            if (flag) {
                this._tail = current;
                flag = false;
            }
            temp = current.next;
            current.next = current.prev;
            current.prev = temp;
            if (!temp)
                this._head = current;
            current = temp;
        }
        return this;
    }

    indexOf(data) {
        var current = this._head,
            i = 0,
            flag = false;
        while (i < this.length) {
            if (current.data == data) {
                flag = true;
                break;
            }
            current = current.next;
            i++;
        }
        return (!flag) ? -1 : i;
    }
}

module.exports = LinkedList;
