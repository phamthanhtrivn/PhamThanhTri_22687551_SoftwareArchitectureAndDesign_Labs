
interface JsonService {
    void process(String json);
}

class XMLService {
    public void processXML(String xml) {
        System.out.println("Processing XML: " + xml);
    }
}

class XMLToJsonAdapter implements JsonService {
    private XMLService xmlService;

    public XMLToJsonAdapter(XMLService xmlService) {
        this.xmlService = xmlService;
    }

    private String convertJsonToXml(String json) {
        return "<xml>" + json + "</xml>";
    }

    @Override
    public void process(String json) {
        String xml = convertJsonToXml(json);

        xmlService.processXML(xml);
    }
}
//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        XMLService xmlService = new XMLService();
        JsonService jsonService = new XMLToJsonAdapter(xmlService);

        String jsonData = "{\"name\": \"John\", \"age\": 30}";
        jsonService.process(jsonData);
    }
}