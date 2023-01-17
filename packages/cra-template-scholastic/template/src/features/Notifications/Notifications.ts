import {connect} from "react-redux"
import {
    NotificationList,
    NotificationListProps,
} from "scholastic-client-components/src/features/NotificationList/NotificationList/NotificationList"
import {
    notificationListSelectors,
    notificationListSlice,
    NotificationListStore,
} from "scholastic-client-components/src/slices/notificationListSlice"

type NotificationListStateProps = Pick<NotificationListProps, "notifications" | "showUpdateMessage">
type NotificationListDispatchProps = Pick<NotificationListProps, "onRemove">

const mapStateToProps = (store: NotificationListStore): NotificationListStateProps => ({
    notifications: notificationListSelectors.getNotifications(store),
    showUpdateMessage: notificationListSelectors.getShowUpdateMessage(store),
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
