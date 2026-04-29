import SwiftUI

struct RootTabView: View {
    var body: some View {
        TabView {
            Text("S-01 入力")
                .tabItem { Label("入力", systemImage: "plus.circle.fill") }

            Text("S-02 カレンダー")
                .tabItem { Label("カレンダー", systemImage: "calendar") }

            Text("S-03 レポート")
                .tabItem { Label("レポート", systemImage: "chart.pie.fill") }

            Text("S-04 予算")
                .tabItem { Label("予算", systemImage: "dollarsign.circle") }

            Text("S-05 設定")
                .tabItem { Label("設定", systemImage: "gearshape") }
        }
    }
}

#Preview {
    RootTabView()
}
