import Foundation
import SwiftData

@Model
final class FixedExpense {
    @Attribute(.unique) var id: UUID
    var name: String
    var amount: Int
    var category: Category?
    var dueDay: Int?
    var memo: String
    var createdAt: Date
    var updatedAt: Date

    init(name: String, amount: Int, category: Category, dueDay: Int? = nil, memo: String = "") {
        self.id = UUID()
        self.name = name
        self.amount = amount
        self.category = category
        self.dueDay = dueDay
        self.memo = memo
        let now = Date()
        self.createdAt = now
        self.updatedAt = now
    }
}
