
const fetchData = async () => {
  const response = await fetch("./data.json");
  const data = await response.json()
  // employee info
  document.querySelector("#header_subtitle").textContent = data.period
  document.querySelector("#manager").textContent = data.manager
  document.querySelector("#pos").textContent = data.pos
  document.querySelector("#line").textContent = data.line
  document.querySelector("#employee").textContent = data.employee
  document.querySelector("#saleBonus").textContent = data.saleBonus
  document.querySelector("#percent").textContent = data.percent + ' %'
  
  // second table
  let nonSalesTable = document.body.querySelector("#nonSales");
  data.nonSales.map((i) => {
    nonSalesTable.insertAdjacentHTML('beforeend',
      `<tr>
        <td class="table-title_td">${i.scale || `-`}</td>
        <td style="text-align: center;">${i.percent || `-`}</td>
        <td style="text-align: center;">${i.fact || `-`}</td>
        <td style="text-align: center;">${
      i.isOK ? 
        `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7" cy="7" r="7" fill="#C4D600"/>
        </svg>`
        : 
        `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7" cy="7" r="7" fill="#B2B2B2"/>
         </svg>`
        }
        </td>
      </tr>`
    ) 
  })
  // first table
  let othersTable = document.body.querySelector("#others");
  data.others.map((i) => {
    othersTable.insertAdjacentHTML('beforeend',
      `<tr>
        <td class="table-title_td">${i.scale || `-`}</td>
        <td style="text-align: center;">${i.fact || `-`}</td>
        <td style="text-align: center;">${i.bonus || `-`}</td>
        <td style="text-align: center;">${
      i.isOK ? 
        `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7" cy="7" r="7" fill="#C4D600"/>
        </svg>`
        : 
        `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7" cy="7" r="7" fill="#B2B2B2"/>
         </svg>`
        }
        </td>
      </tr>
      `
    )
  })
  // third table
  let salesTable = document.body.querySelector("#sales");
  let total = 0;
  data.sales.map((i) => {
    total += i.saleBonus;
    salesTable.insertAdjacentHTML('beforeend',
      `
      <tr>
        <td class="table-title_td">${i.name || `-`}</td>
        <td style="text-align: center;">${i.plan.toLocaleString('ru-RU') || `-`}</td>
        <td style="text-align: center;">${i.fact.toLocaleString('ru-RU') || `-`}</td>
        <td style="text-align: center;">${i.done || `-`}</td>
        <td style="text-align: center;">${i.weight || `-`}</td>
        <td style="text-align: center;">${i.bonus.toLocaleString('ru-RU', {minimumFractionDigits: 1}) || `-`}</td>
        <td style="text-align: center;">${i.saleBonus.toLocaleString('ru-RU', {minimumFractionDigits: 2}) || `-`}</td>
      </tr>
      `
    )
  })
  salesTable.insertAdjacentHTML('beforeend',
    `
    <tr>
      <td class="table-title_td total">ИТОГО</td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;"></td>
      <td style="text-align: center;" class="total">${total.toLocaleString('ru-RU', {minimumFractionDigits: 2})}</td>
    </tr>
    `
  )
  // yearSaleBonus - итоговое вознаграждение
  document.querySelector("#yearSaleBonus").textContent = total.toLocaleString('ru-RU') + ' ₽';

  const colors = ['#004C96', '#F0AB00', '#25858D', '#D0006F', '#830051']
  const randColor = (colorArr) => {
    return Math.floor(Math.random() * ((colorArr.length - 1)- 0 + 1)) + 0
  }

  const createDiagramm = () => {
    let ctx = [];
    data.sales.map((i) => {
      ctx.push({
        name: i.name,
        saleBonus: i.saleBonus
      })
    });
    ctx = ctx.sort((a, b) => {
      return b - a;
    });

    let totalDiagramm = document.body.querySelector("#total_diagramm");
    let values = document.body.querySelector("#values");
    ctx.map((i) => {
      let color = randColor(colors);
      totalDiagramm.insertAdjacentHTML('beforeend', 
        `
        <svg width="152" height="36" viewBox="0 0 152 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="152" height="36" fill="${colors[color]}" />
          <text class="rect_text" x="38%" y="22">${i.saleBonus.toLocaleString('ru-RU', {minimumFractionDigits: 2})}</text>
        </svg>
        `
      );
      values.insertAdjacentHTML('beforeend',
        `
        <span class="values_name">
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="19" height="19" fill="${colors[color]}"/>
        </svg>
        <p>${i.name}</p>
        </span>
        `
      )
    })
  }
  createDiagramm()
}

fetchData()