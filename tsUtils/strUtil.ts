/**
 * 输入数字，返回字母,1-->A,2-->B,...27-->AA,28-->AB,...53-->BA
 * @param number 数字
 * @returns 字母
 */
export function generateLetterSequence(number: number) {
	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let result = '';
	while (number > 0) {
		number--;
		let remainder = number % 26;
		result = letters.charAt(remainder) + result;
		number = Math.floor(number / 26);
	}
	return result;
}

/**
 * 校验公式是否合法
 * @param expression 代数公式
 * @param operands 待选公式变量
 */
export function checkCalcExpressionValid(formula: string, operands: string[]) {
	// 验证
	if (IsNullEmpty(formula)) {
		return false;
	}

	// 错误情况，变量没有来自“待选公式变量”
	var tmpStr = formula.replace(/[\(\)\+\-\*\/]{1,}/g, '`');
	var array = tmpStr.split('`');
	for (var i = 0, item; i < array.length; i++) {
		item = array[i];
		// 验证变量没有使用提供的变量
		if (/[a-zA-Z]/i.test(item) && operands.indexOf(item) === -1) {
			return false;
		}
		// 错误情况，验证变量连续
		if (/[a-zA-Z]/i.test(item) && new RegExp(`/${item}{2,}/`).test(item)) {
			return false;
		}
	}

	// 错误情况，运算符连续
	if (/[\+\-\*\/]{2,}/.test(formula)) {
		return false;
	}

	// 空括号
	if (/\(\)/.test(formula)) {
		return false;
	}

	//空中括号
	if (/\[\]/.test(formula)) {
		return false;
	}

	// 错误情况，括号不配对
	var stack = [];
	for (var i = 0, item; i < formula.length; i++) {
		item = formula.charAt(i);
		if ('(' === item) {
			stack.push('(');
		} else if (')' === item) {
			if (stack.length > 0) {
				stack.pop();
			} else {
				return false;
			}
		}
	}
	if (0 !== stack.length) {
		return false;
	}

	// 错误情况，中括号不配对
	var stack2 = [];
	for (var i = 0, item; i < formula.length; i++) {
		item = formula.charAt(i);
		if ('[' === item) {
			stack2.push('[');
		} else if (']' === item) {
			if (stack2.length > 0) {
				stack2.pop();
			} else {
				return false;
			}
		}
	}
	if (0 !== stack2.length) {
		return false;
	}

	// 错误情况，(后面是运算符
	if (/\([\+\-\*\/]/.test(formula)) {
		return false;
	}

	// 错误情况，)前面是运算符
	if (/[\+\-\*\/]\)/.test(formula)) {
		return false;
	}

	// 错误情况，[后面是运算符
	if (/\[[\+\-\*\/]/.test(formula)) {
		return false;
	}

	// 错误情况，]前面是运算符
	if (/[\+\-\*\/]\]/.test(formula)) {
		return false;
	}

	//错误情况，运算符号不能在首末位
	if (/^[\+\*\/.]|[\+\-\*\/.]$/.test(formula)) {
		return false;
	}

	//错误情况，中括号结尾到下一个开始之间没有运算符
	if (/\]\[/.test(formula)) {
		return false;
	}

	return true;
}
