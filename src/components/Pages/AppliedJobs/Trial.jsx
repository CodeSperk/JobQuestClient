import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. 
          Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc 
          lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, 
          pellentesque lobortis odio.
        </Text>
      </View>
    </Page>
  </Document>
);

const Trial = () => {
  return (
    <PDFViewer width="1000" height="600">
      <MyDocument />
    </PDFViewer>
  );
};

export default Trial;
