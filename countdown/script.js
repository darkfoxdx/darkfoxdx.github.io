document.getElementById('calcForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const resultDiv = document.getElementById('result');
    resultDiv.innerText = 'Loading...';

    const target = parseInt(document.getElementById('target').value);
    const numbers = document.getElementById('numbers').value.split(',').map(num => parseInt(num.trim()));

    if (isNaN(target) || numbers.some(isNaN)) {
        document.getElementById('result').innerText = 'Please enter valid integers for target and numbers.';
        return;
    }

    class Node {
        constructor(indice, calc_string, total) {
            this.indice = indice;
            this.calc_string = calc_string;
            this.total = total;
        }
    }

    function containsSame(first, second) {
        return first.some(f => second.includes(f));
    }

    let calc = [];
    let closest = new Node([], '', 0);

    outerLoop:
    for (let loop = 0; loop < numbers.length; loop++) {
        if (loop === 0) {
            for (let i = 0; i < numbers.length; i++) {
                let result = new Node([i], `${numbers[i]}`, numbers[i]);
                calc.push(result);
                if (Math.abs(closest.total - target) > Math.abs(result.total - target)) {
                    closest = result;
                }
                if (result.total === target) {
                    closest = result;
                    break outerLoop;
                }
            }
        } else {
            let length = calc.length;
            for (let i = 0; i < length; i++) {
                for (let j = 0; j < length; j++) {
                    let first = calc[i];
                    let second = calc[j];

                    if (i === j || containsSame(first.indice, second.indice)) {
                        continue;
                    }

                    let newIndices = first.indice.concat(second.indice);
                    for (let e = 0; e < 4; e++) {
                        let result;
                        switch (e) {
                            case 0:
                                result = new Node(newIndices, `(${first.calc_string}+${second.calc_string})`, first.total + second.total);
                                break;
                            case 1:
                                result = new Node(newIndices, `(${first.calc_string}-${second.calc_string})`, first.total - second.total);
                                break;
                            case 2:
                                result = new Node(newIndices, `(${first.calc_string}*${second.calc_string})`, first.total * second.total);
                                break;
                            case 3:
                                if (second.total === 0 || first.total % second.total !== 0) {
                                    continue;
                                }
                                result = new Node(newIndices, `(${first.calc_string}/${second.calc_string})`, Math.floor(first.total / second.total));
                                break;
                        }

                        calc.push(result);

                        if (Math.abs(closest.total - target) > Math.abs(result.total - target)) {
                            closest = result;
                        }
                        if (result.total === target) {
                            closest = result;
                            break outerLoop;
                        }
                    }
                }
            }
        }
    }

    document.getElementById('result').innerText = `Closest: ${closest.calc_string} = ${closest.total}`;
});
