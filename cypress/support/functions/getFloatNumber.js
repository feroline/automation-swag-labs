const getFloatNumber = (string) => {

    return parseFloat(string.text().replace('$', ''));
  
};

export default getFloatNumber;