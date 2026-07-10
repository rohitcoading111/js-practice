const weeklyChart = document.getElementById("weeklyChart");

let weeklyFocus = JSON.parse(
    localStorage.getItem("weeklyFocus")
) || {

    Mon:0,
    Tue:0,
    Wed:0,
    Thu:0,
    Fri:0,
    Sat:0,
    Sun:0

};

const chart = new Chart(weeklyChart,{

    type:"line",

    data:{

        labels:[
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ],

        datasets:[{

            label:"Focus Minutes",

            data:[

                weeklyFocus.Mon,
                weeklyFocus.Tue,
                weeklyFocus.Wed,
                weeklyFocus.Thu,
                weeklyFocus.Fri,
                weeklyFocus.Sat,
                weeklyFocus.Sun

            ],

            borderColor:"#3b82f6",

            backgroundColor:"rgba(59,130,246,.2)",

            borderWidth:3,

            fill:true,

            tension:.4

        }]

    },

    options:{

        responsive:true,

        plugins:{

            legend:{

                labels:{

                    color:"white"

                }

            }

        },

        scales:{

            x:{

                ticks:{

                    color:"white"

                }

            },

            y:{

                beginAtZero:true,

                ticks:{

                    color:"white"

                }

            }

        }

    }

});