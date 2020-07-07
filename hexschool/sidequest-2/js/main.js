const app = new Vue({
  el: "#app",
  data: {
    traits: [],
    traitsTW: [],
    description: "",
    neuroticism: {},
    extroversion: {},
    openness: {},
    agreeableness: {},
    conscientiousness: {},
    allProblems: [],
  },
  methods: {
    result() {
      this.traits.forEach(trait => {
        const name_1 = `input[name=${trait.slice(0, 1)}1]:checked`;
        const name_2 = `input[name=${trait.slice(0, 1)}2]:checked`;
        this[trait].score = Number($(name_1).val()) + Number($(name_2).val())
      });
      this.createChart();
      $('#resultModal').modal('show');
    },
    createChart() {
      const ctx = document.getElementById('myChart');
      const myChart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
  },
  created() {
    const vm = this;
    axios.get("https://raw.githubusercontent.com/hexschool/js-training-task/master/api/BigFive.json")
      .then(res => {
        // 載入問卷資料
        vm.traits = res.data.traits.en;
        vm.traitsTW = res.data.traits.zh;
        vm.description = res.data.description;
        vm.traits.forEach(trait => {
          vm[trait] = res.data.problemList[trait];
          res.data.problemList[trait].problems.forEach(problem => {
            vm.allProblems.push(problem);
          });
          // 分數初始化
          vm.$set(vm[trait], "score", 0);
        });
        // 問題洗牌
        vm.allProblems = shuffle(vm.allProblems);
      })
      .catch(error => {
        console.log(error);
      });
  }
});

// 陣列隨機排序
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}