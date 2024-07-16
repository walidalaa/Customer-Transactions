const customers = [
  // { id: 1, name: "John Doe" },
  // { id: 2, name: "Jane Smith" },
// Add more customers

  {
    id: 1,
    name: "Ahmed Ali",
  },
  {
    id: 2,
    name: "Aya Elsayed",
  },
  {
    id: 3,
    name: "Mina Adel",
  },
  {
    id: 4,
    name: "Sarah Reda",
  },
  {
    id: 5,
    name: "Mohamed Sayed",
  },
  {
    id: 6,
    name: "Mohamed Hassan",
  },
  {
    id: 7,
    name: "Yussif Ahmed",
  },
  {
    id: 8,
    name: "Nora Hany",
  }, {
    id: 9,
    name: "Mahmoud Magdy",
  },
];

const transactions = [
  { customerId: 1, amount: 1000, date: "2022-01-01" },
  { customerId: 2, amount: 2000, date: "2022-01-02" },
  { customerId: 3, amount: 550, date: "2022-01-01" },
  { customerId: 4, amount: 500, date: "2022-01-01" },
  { customerId: 5, amount: 1300, date: "2022-01-02"},
  { customerId: 6, amount: 750, date: "2022-01-01" },
  { customerId: 7, amount: 1250, date: "2022-01-02" },
  { customerId: 8, amount: 2500, date: "2022-01-01" },
  { customerId: 9, amount: 875, date: "2022-01-02" },


// Add more transactions.
]
document.addEventListener("DOMContentLoaded", () => {
  const customerFilter = document.getElementById("customerFilter");
  const amountFilter = document.getElementById("amountFilter");
  const customerTableBody = document.querySelector("#customerTable tbody");
  const transactionChart = document
    .getElementById("transactionChart")
    .getContext("2d");

  let selectedCustomer = null;

  const renderTable = () => {
    const filteredCustomers = customers.filter((c) =>
      c.name.toLowerCase().includes(customerFilter.value.toLowerCase())
    );

    customerTableBody.innerHTML = "";

    filteredCustomers.forEach((customer) => {
      const customerTransactions = transactions.filter(
        (t) =>
          t.customerId === customer.id &&
          t.amount.toString().includes(amountFilter.value)
      );

      customerTransactions.forEach((transaction) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                  <td>${customer.name}</td>
                  <td>${transaction.amount}</td>
                  <td>${transaction.date}</td>
              `;
        customerTableBody.appendChild(row);
      });
    });
  };

  const renderChart = () => {
    const filteredTransactions = transactions.filter(
      (t) =>
        selectedCustomer &&
        t.customerId === selectedCustomer.id &&
        t.amount.toString().includes(amountFilter.value)
    );

    const totalTransactionAmountPerDay = filteredTransactions.reduce(
      (acc, t) => {
        acc[t.date] = (acc[t.date] || 0) + t.amount;
        return acc;
      },
      {}
    );

    new Chart(transactionChart, {
      type: "bar",
      data: {
        labels: Object.keys(totalTransactionAmountPerDay),
        datasets: [
          {
            label: "Total Transaction Amount",
            data: Object.values(totalTransactionAmountPerDay),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: { beginAtZero: true },
          y: { beginAtZero: true },
        },
      },
    });
  };

  customerFilter.addEventListener("input", renderTable);
  amountFilter.addEventListener("input", renderTable);

  renderTable();
});
