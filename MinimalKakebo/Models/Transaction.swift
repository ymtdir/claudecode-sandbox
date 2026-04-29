import Foundation
import SwiftData

@Model
final class Transaction {
    @Attribute(.unique) var id: UUID
    var amount: Int
    var type: TransactionType
    var date: Date
    var memo: String
    var category: Category?
    var createdAt: Date
    var updatedAt: Date

    init(amount: Int, type: TransactionType, date: Date, memo: String = "", category: Category) {
        self.id = UUID()
        self.amount = amount
        self.type = type
        self.date = date
        self.memo = memo
        self.category = category
        let now = Date()
        self.createdAt = now
        self.updatedAt = now
    }
}
