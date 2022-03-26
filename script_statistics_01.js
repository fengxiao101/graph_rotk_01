calculate_statistics();

function calculate_statistics(){
    for(let i=2; i<array_stats_type.length; i++){
        // console.log(`Average ${array_stats_type[i]}: ${(average_of_stats(array_stats_type[i])).toFixed(2)}`);
        // console.log(`Standard deviation of ${array_stats_type[i]}: ${(standard_deviation_of_stats(array_stats_type[i])).toFixed(2)}`);
        // console.log(``);

        // let object_average = object_average_stats(array_stats_type[i]);
        // console.log(`Average ${array_stats_type[i]}: ${object_average.value}`);
        // console.log(object_average.array_general);


    }


}

function average_of_stats(a_stats_type){
    let array_stats = dictionary_of_array_stats[a_stats_type];

    return average_of_array(array_stats);
}

function standard_deviation_of_stats(a_stats_type){
    let array_stats = dictionary_of_array_stats[a_stats_type];

    return Math.sqrt(variance_of_array(array_stats));
}


function array_general_with_given_stats(a_stats_type, a_value){
    return array_data_general.filter((object_general)=>{return object_general[a_stats_type] === a_value});
}

function object_average_stats(a_stats_type){
    let object_average = {};
    object_average.value = Math.round(average_of_stats(a_stats_type));

    object_average.array_general = array_general_with_given_stats(a_stats_type, object_average.value);
    return object_average;
}

function median_of_array(a_array){
    let array_sorted = a_array.sort((a, b) => {return a - b});

    console.log(array_sorted);

    if (array_sorted.length%2 == 0){
        return (array_sorted[array_sorted.length/2] + array_sorted[array_sorted.length/2 - 1])/2;
    } else {
        return array_sorted[Math.floor(array_sorted.length/2)];
    }

}