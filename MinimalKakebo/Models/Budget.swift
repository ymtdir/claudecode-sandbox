import Foundation
import SwiftData

@Model
final class Budget {
    @Attribute(.unique) var id: UUID
    var category: Category?
    var monthlyAmount: Int
    var createdAt: Date
    var updatedAt: Date

    init(category: Category? = nil, monthlyAmount: Int) {
        self.id = UUID()
        self.category = category
        self.monthlyAmount = monthlyAmount
        let now = Date()
        self.createdAt = now
        self.updatedAt = now
    }
}
