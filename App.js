/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import xml2js from 'react-native-xml2js';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  
  async componentDidMount() {
    header = {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml',
        Authorization: 'Basic dHJhdmVsc2ltOmZ0YWcycmFT',
        SOAPAction: 'getPlans'
      },
      body: '<?xml version="1.0" encoding="utf-8"?>\n' +
      '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ecgw="ecgw">\n' +
      '\n' +
      '   <soapenv:Header>\n' +
      '   \t</soapenv:Header>\n' +
      '\n' +
      '   <soapenv:Body>\n' +
      '\n' +
      '      <ecgw:getPlans soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">\n' +
      '\n' +
      '         <spconfigID xsi:type="xsd:double">18</spconfigID>\n' +
      '\n' +
      '         <planid xsi:type="xsd:double"></planid>\n' +
      '\n' +
      '         <Log xsi:type="xsd:double">1</Log>\n' +
      '\n' +
      '      </ecgw:getPlans>\n' +
      '\n' +
      '   </soapenv:Body>\n' +
      '\n' +
      '</soapenv:Envelope>'
    };
    try {
      let response = await fetch('https://eap2.ecconnect.com.au/eap/owi/webservices/ecgw_webservice.cfc?wsdl', header);
  
      this.xmlResponse = await response.text();
      console.log('xmlResponse', this.xmlResponse);
  
      xml2js.parseString(this.xmlResponse, (err, result) => {
        if (err) {
          throw (err);
        }
        this.responseDoc = result;
        console.info('result', result);
      });
    } catch (e) {
      console.info('error', e);
    }
    
    // xml2js.parseString("<getPlansReturn xsi:type=\"soapenc:string\" xmlns:soapenc=\"http://schemas.xmlsoap.org/soap/encoding/\">" +
    //   "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
    //   "<plans>\n" +
    //   "\n" +
    //   "<plan id=\"2\">\n" +
    //   "<planname><![CDATA[Pay As You Go 4G]]></planname>\n" +
    //   "<networkname><![CDATA[Mobile]]></networkname>\n" +
    //   "<description/>\n" +
    //   "<planamount>0</planamount>\n" +
    //   "<plansetup>5</plansetup>\n" +
    //   "<plantype>Mobile</plantype>\n" +
    //   "<plangroup>Mobile</plangroup>\n" +
    //   "<product_display_name><![CDATA[New ADSL]]></product_display_name>\n" +
    //   "<rateplan_display_name/>\n" +
    //   "<ll_rateplanid>0</ll_rateplanid>\n" +
    //   "<shownumber>no</shownumber>\n" +
    //   "<req_address_check>no</req_address_check>\n" +
    //   "</plan>\n" +
    //   "\n" +
    //   "<plan id=\"1\">\n" +
    //   "<planname><![CDATA[Pay As You Go 3G]]></planname>\n" +
    //   "<networkname><![CDATA[Mobile]]></networkname>\n" +
    //   "<description/>\n" +
    //   "<planamount>0</planamount>\n" +
    //   "<plansetup>5</plansetup>\n" +
    //   "<plantype>Mobile</plantype>\n" +
    //   "<plangroup>Mobile</plangroup>\n" +
    //   "<product_display_name><![CDATA[New ADSL]]></product_display_name>\n" +
    //   "<rateplan_display_name/>\n" +
    //   "<ll_rateplanid>0</ll_rateplanid>\n" +
    //   "<shownumber>no</shownumber>\n" +
    //   "<req_address_check>no</req_address_check>\n" +
    //   "</plan>\n" +
    //   "\n" +
    //   "</plans></getPlansReturn>", function (err, result) {
    //   console.dir(result.getPlansReturn);
    //   console.info('time', new Date());
    //   console.dir(result.getPlansReturn["$"]);
    //   console.info('time', new Date());
    //   console.dir(result.getPlansReturn["plans"]);
    //   console.log(err);
    // });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
