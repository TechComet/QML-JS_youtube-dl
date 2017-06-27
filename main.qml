import QtQuick 2
import "yt-dl.js" as Yt

Rectangle {
  width: 500; height: 700
  visible: true

  Item {
    id: itemView
    x: 0; y: 0
    width: parent.width; height: 50

    BorderImage {
      source: "lineedit.sci"
      anchors.fill: parent
    }
  
    TextInput {
      id: inputUrl
      text: ""
      anchors.leftMargin: 10
      anchors.verticalCenter: parent.verticalCenter
      anchors.left: parent.left
      
      focus: true
      
      Keys.onPressed: {
        if (event.key == Qt.Key_Enter || event.key == Qt.Key_Return) {
          Yt.get_info_video();
        }
        
      }
      
    }
    
  }
  
  ListView {
    y: itemView.height + 10
    width: 180; height: 200
    
    contentWidth: 320
    
    model: ListModel { id: listView }
    
    delegate: Column {
      Text { text: type }
      Text { text: url }
      Text { text: '< ---------- >' }
    }
    
  }

}
