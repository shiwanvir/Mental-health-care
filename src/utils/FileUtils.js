/*This is a common place that we'll use read and write our data.All the need to be in the
JSON format and we save them inside ./src/dataSources/<FILE_NAME.json>*/
// FileUtils.js
import * as FileSystem from 'expo-file-system';

// Read JSON data from file
export const readJSONFile = async (fileName) => {
  const filePath = `${FileSystem.cacheDirectory}src/dataSources/${fileName}.json`;

  try {
    const fileContent = await FileSystem.readAsStringAsync(filePath);
    const jsonData = JSON.parse(fileContent);
    console.log('Data read successfully:', jsonData);
    return jsonData;
  } catch (error) {
    console.log('Error reading JSON file:', error);
    return null;
  }
};

// Write JSON data to file
export const writeJSONFile = async (fileName, data) => {
  const filePath = `${FileSystem.cacheDirectory}src/dataSources/${fileName}.json`;

  try {
    await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data));
    console.log('JSON file written successfully');
  } catch (error) {
    console.log('Error writing JSON file:', error);
  }
};
