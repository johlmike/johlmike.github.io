const app = new Vue({
  el: "#app",
  data: {
    traits: [],
    traitsTW: [],
    description: "",
    problems: [],
    scores: {},
    descriptions: {
      openness: "",
      conscientiousness: "",
      extroversion: "",
      agreeableness: "",
      neuroticism: "",
    },
    degree: {},
    firstTest: true, // 檢查使用者是否第一次測驗
    activeNavClass: "nav-item nav-link active",
    unactiveNavClass: "nav-item nav-link",
    activeTabClass: "tab-pane fade show active",
    unactiveTabClass: "tab-pane fade show",
  },
  methods: {
    result() {
      let ready = true;
      
      this.traits.forEach(trait => {
        const name_1 = `input[name=${trait.slice(0, 1)}1]:checked`;
        const name_2 = `input[name=${trait.slice(0, 1)}2]:checked`;
        // 檢查使用者是不是沒有填完
        if (!$(name_1).val() || !$(name_2).val()){
          ready = false;
        } else {
          this.scores[trait] = Number($(name_1).val()) + Number($(name_2).val())
        }
      });

      if (ready) {
        // 建立chart.js圖表
        this.createChart();
        // 如使用者第一次測驗，觸發折疊特效提示使用者
        if( this.firstTest ){
          this.firstTest = false;
          setTimeout(() => {
            $('#openness-desc').collapse('show');
          }, 500);
          setTimeout(() => {
            $('#openness-desc').collapse('hide');
          }, 1500);
        }
        // 顯示結果Modal
        $('#resultModal').modal('show');
      } else {
        alert('有題目還沒有回答喔！');
      }
    },
    createChart() {
      const ctx = document.getElementById('myChart');
      const scores = [];
      const vm = this;
      this.traits.forEach(trait => {
        scores.push(vm.scores[trait]);
      });
      const myChart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: this.traitsTW,
          datasets: [{
            label: '你的五大性格特質',
            data: scores,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          scale: {
            angleLines: {
              display: false
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 10,
              stepSize: 1,
            },
            pointLabels: {
              fontSize: 16,
            }
          },
          legend: {
            labels: {
              fontSize: 16,
            }
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
        vm.degree = res.data.degree;
        vm.traits.forEach(trait => {
          // 將題目放入題庫陣列
          res.data.problemList[trait].problems.forEach(problem => {
            vm.problems.push(problem);
          });
          // 儲存五大特質說明
          vm.descriptions[trait] = res.data.problemList[trait].description;
          // 分數初始化
          vm.$set(vm.scores, trait, 0);
        });
        // 問題洗牌
        vm.problems = shuffle(vm.problems);
        // tooltip初始化
        // $('.result-title').tooltip();
        
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