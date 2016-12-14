/**
 * Created by zhaojm on 15/3/17.
 */
game._Config = {
    language : game._Enum.language.en,    // cn or en

    show_ads : false,


    row_num : 10, // 行数
    col_num : 10, // 列数

    bottomHeight : 52, // 底部高度




    getGoalScoreByLevel : function(level){
        return ([
            {
                level : 0,
                goalScore : 0,
            },
            {
                level : 1,
                goalScore : 1000,
            },
            {
                level : 2,
                goalScore : 3000,
            },
            {
                level : 3,
                goalScore : 6000,
            },
            {
                level : 4,
                goalScore : 8000,
            },
            {
                level : 5,
                goalScore : 10000,
            },
            {
                level : 6,
                goalScore : 11000,
            },
            {
                level : 7,
                goalScore : 13000,
            },
            {
                level : 8,
                goalScore : 16000,
            },
            {
                level : 9,
                goalScore : 18000,
            },
            {
                level : 10,
                goalScore : 19000,
            },
            {
                level : 11,
                goalScore : 22000,
            },
            {
                level : 12,
                goalScore : 24000,
            },
            {
                level : 13,
                goalScore : 25000,
            },
            {
                level : 14,
                goalScore : 28000,
            },
            {
                level : 15,
                goalScore : 30000,
            },

        ])[level].goalScore;
    },


    getAddScoreByNum:function(num){
        return (1 + num) * num * 0.5 * 10 - 5 * num;
    },




};