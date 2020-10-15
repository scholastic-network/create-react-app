import {connect} from "react-redux"
import {
    NotificationList,
    NotificationListProps,
    notificationListSelectors,
    notificationListSlice,
    NotificationListStore,
} from "scholastic-client-components"

type NotificationListStateProps = Pick<NotificationListProps, "notifications" | "showUpdateMessage">
type NotificationListDispatchProps = Pick<NotificationListProps, "onRemove">

const mapStateToProps = (store: NotificationListStore): NotificationListStateProps => ({
    notifications: notificationListSelectors(store).getNotifications(),
    showUpdateMessage: notificationListSelectors(store).getShowUpdateMessage(),
})

const mapDispatchToProps: NotificationListDispatchProps = {
    onRemove: notificationListSlice.actions.removeNotification,
}

export const Notifications = connect<
    NotificationListStateProps,
    NotificationListDispatchProps,
    {},
    NotificationListStore
>(
    mapStateToProps,
    mapDispatchToProps
)(NotificationList)
