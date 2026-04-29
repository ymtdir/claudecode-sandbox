import Foundation
import SwiftData

@Model
final class Category {
    @Attribute(.unique) var id: UUID
    @Attribute(.unique) var name: String
    var sortOrder: Int

    @Relationship(deleteRule: .deny, inverse: \Transaction.category)
    var transactions: [Transaction] = []

    @Relationship(deleteRule: .deny, inverse: \Budget.category)
    var budgets: [Budget] = []

    @Relationship(deleteRule: .deny, inverse: \FixedExpense.category)
    var fixedExpenses: [FixedExpense] = []

    var createdAt: Date
    var updatedAt: Date

    init(name: String, sortOrder: Int) {
        self.id = UUID()
        self.name = name
        self.sortOrder = sortOrder
        let now = Date()
        self.createdAt = now
        self.updatedAt = now
    }
}
