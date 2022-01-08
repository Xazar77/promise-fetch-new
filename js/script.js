const filterByType = (type, ...values) => values.filter(value => typeof value === type),// создали функцию по фильтрации значений по типу данных

	hideAllResponseBlocks = () => { // функция по скрытию всех данныха блоке "результаты"
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // все элементы  в блоке "результаты" формируем в массив
		responseBlocksArray.forEach(block => block.style.display = 'none');// перебираем элементы массива и скрываем их
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { // функция показывающая результаты в блоке "результаты"
		hideAllResponseBlocks();										// сначало все блоки скрываем
		document.querySelector(blockSelector).style.display = 'block'; // показываем все блоки
		if (spanSelector) { 											// если это span 
			document.querySelector(spanSelector).textContent = msgText; // то в textConten выводим текст результата
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), // функция выводящая в textConten текст в случае ошибки

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), // функция выводящая в textConten текст в случае успеха

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), // функцию  выводящая в textConten текст 'Поле не должно быть пустым!'в случае отсутствия данных

	tryFilterByType = (type, values) => {// функция выводит результат данных по типам
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // массив с типом данных и значениями переводи в строку через запятую
			const alertMsg = (valuesArray.length) ?  // с использованием тернарного оператора формируем сообщение которое будет выводится в случае успеха
				`Данные с типом ${type}: ${valuesArray}`: //т.к используем метод eval() применяем конструкцию try catch
				`Отсутствуют данные типа ${type}`;
			showResults(alertMsg); // вызываем функцию для показа результата
		} catch (e) {
			showError(`Ошибка: ${e}`); // вывод ошибки
		}
	};

const filterButton = document.querySelector('#filter-btn'); // получение блока с кнопками по ID

filterButton.addEventListener('click', e => { // вешаем обработчик события. Делегирование событий с сипользованием event
	const typeInput = document.querySelector('#type'); // получаем инпут для выбора типов данных
	const dataInput = document.querySelector('#data'); // получаем инпут для ввода данных

	if (dataInput.value === '') { // проверка поля ввода переменных
		dataInput.setCustomValidity('Поле не должно быть пустым!'); // если оно пустое, устанавливаем  специальное сообщение для  выбранного элемента.
		showNoResults(); // вызываем функцию   выводящая в textConten текст 'Поле не должно быть пустым!'в случае отсутствия данных
	} else { //иначе
		dataInput.setCustomValidity(''); //убираем  специальное сообщение для  выбранного элемента
		e.preventDefault(); // отменяем стандартное поведение event
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //вызываем функцию с результат данных по типам убирая методом trim() по краям пробелы
	}
});

