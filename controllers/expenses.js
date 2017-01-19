var app = angular.module('kim', [])
angular.module('kim').controller('expenses', function ($scope) {
  // Example expenses
  $scope.expenses = [
    {
      name: 'Sorvete de damasco',
      cost: '15.10',
      createdDate: new Date(),
      tags: [
        'alimentação',
        'lazer'
      ]
    },
    {
      name: 'Remédios para dor de cabeça',
      cost: '33.89',
      createdDate: new Date(),
      tags: [
        'saúde'
      ]
    }
  ]

  /**
  * Saves the given expense.
  */
  $scope.saveExpense = function (expense) {
    expense.createdDate = new Date()
    expense.tags = []
    expense.cost = expense.cost.replace(',', '.')

    var expenseWords = expense.name.split(' ')
    for (var i = expenseWords.length - 1; i >= 0; i--) {
      if (expenseWords[i][0] === '#') {
        expense.tags.push((expenseWords[i].replace('#', '')).toLowerCase())
        expenseWords.splice(i, 1)
      }
    }

    expense.name = expenseWords.join(' ')
    $scope.expenses.push(angular.copy(expense))
    delete $scope.expense
    $scope.createExpenseForm.$setPristine()
  }

  /**
  * Removes the given expense.
  */
  $scope.removeExpense = function (expenseToRemove) {
    var indexToRemove = $scope.expenses.indexOf(expenseToRemove)
    $scope.expenses.splice(indexToRemove, 1)
  }

  /**
  * Count the total of itens in the given list.
  */
  $scope.countExpenses = function (expenses) {
    return expenses.length
  }

  /**
  * Count the total cost of the given expenses.
  */
  $scope.countExpensesCost = function (expenses) {
    var totalCost = 0
    expenses.forEach(function (expense) {
      totalCost += parseFloat(expense.cost, 10)
    })

    return totalCost.toFixed(2)
  }
})
