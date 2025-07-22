document.addEventListener('DOMContentLoaded', function () {
    {
        function formatDate(date, time) {
            const mon = {
                Jan: '01',
                Feb: '02',
                Mar: '03',
                Apr: '04',
                May: '05',
                Jun: '06',
                Jul: '07',
                Aug: '08',
                Sep: '09',
                Oct: '10',
                Nov: '11',
                Dec: '12',
            };
            const [day, month, year] = date.split('-');
            return `${year}-${mon[month]}-${day} ${time}`;
        }
        document.body.appendChild(document.querySelector('pre>a'))
        let ngx_table = document.createElement('table')
        let ngx_thead = document.createElement('thead')
        let ngx_tbody = document.createElement('tbody')
        let ngx_thead_tr = document.createElement('tr')
        let ngx_file_name_th = document.createElement('th')
        let ngx_modified_time_th = document.createElement('th')
        let ngx_file_size_th = document.createElement('th')
        ngx_file_name_th.textContent = '名称'
        ngx_modified_time_th.textContent = '修改时间'
        ngx_file_size_th.textContent = '大小'
        document.body.appendChild(ngx_table).appendChild(ngx_thead).appendChild(ngx_thead_tr).appendChild(ngx_file_name_th)
        ngx_thead_tr.appendChild(ngx_modified_time_th)
        ngx_thead_tr.appendChild(ngx_file_size_th)
        document.body.appendChild(ngx_table).appendChild(ngx_tbody)
        for (let a of document.querySelectorAll('pre>a')) {
            let ngx_tbody_tr = document.createElement('tr')
            let [date, time, size] = a.nextSibling.textContent.trim().replace(/\s+/g, ' ').split(' ')
            size = size.replace('-', '0')
            let ngx_modified_time = document.createElement('td')
            let ngx_file_size = document.createElement('td')
            ngx_modified_time.textContent = formatDate(date, time)
            ngx_file_size.dataset.value = size
            ngx_file_size.textContent = (parseInt(size) / 1048576).toLocaleString() + ' MB'
            a.nextSibling.remove()
            ngx_tbody.appendChild(ngx_tbody_tr).appendChild(document.createElement('td')).appendChild(a)
            a.textContent = decodeURIComponent(a.getAttribute('href'))
            ngx_tbody_tr.appendChild(ngx_modified_time)
            ngx_tbody_tr.appendChild(ngx_file_size)
        }
        ngx_thead_tr.addEventListener('pointerdown', function (e) {
            e.preventDefault()
            for (let tr of Array.from(ngx_tbody.rows).sort(function (row1, row2) {
                var a = parseInt(row1.cells[e.target.cellIndex].dataset.value) || row1.cells[e.target.cellIndex].textContent
                var b = parseInt(row2.cells[e.target.cellIndex].dataset.value) || row2.cells[e.target.cellIndex].textContent
                if (a > b)
                    return e.button - 0.5
                if (a < b)
                    return 0.5 - e.button
                return 0;
            })) {
                ngx_tbody.appendChild(tr)
            }
        })

        const h1 = document.querySelector("h1")
        if (!h1) return
        let base = "/"
        const links = h1.textContent.replace(/^Index of\s*/i, "").trim().split("/").filter(Boolean).map((seg, i) => {
            base += encodeURIComponent(seg) + "/"
            return `<a href="${base}">${seg}</a>`
        })
        h1.innerHTML = `<a href="/">115</a><br><a href="/aa/Desktop/zup/">zup</a><br>/${links.join(" / ")}`

        for (let tr of Array.from(ngx_tbody.rows).sort(function (row1, row2) {
            var a = parseInt(row1.cells[1].dataset.value) || row1.cells[1].textContent
            var b = parseInt(row2.cells[1].dataset.value) || row2.cells[1].textContent
            if (a > b)
                return -1
            if (a < b)
                return 1
            return 0
        })) {
            ngx_tbody.appendChild(tr)
        }
    }
})
