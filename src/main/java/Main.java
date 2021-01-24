import javax.swing.plaf.nimbus.State;
import java.sql.*;
import java.util.Arrays;
import java.util.concurrent.atomic.AtomicInteger;


public class Main {

    public static void showEtaty(Connection conn) throws SQLException {
        Statement stmt = null;
        ResultSet rs = null;
        stmt = conn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
                ResultSet.CONCUR_READ_ONLY);
        rs = stmt.executeQuery(
                "select nazwa from etaty");

        while (rs.next()) {
            System.out.println(rs.getString(1));
        }
    }


    public static void main(String[] args) {
        ConnectionController connectionController = new ConnectionController();
        connectionController.open();
        Connection conn = connectionController.getConn();
//        Statement stmt = null;
        ResultSet rs = null;
        ResultSet rs1 = null;
        try {
            conn.setAutoCommit(false);
//            stmt = conn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
//                    ResultSet.CONCUR_READ_ONLY);
//            showEtaty(conn);
//            int changes = stmt.executeUpdate("insert into ETATY values ('oligarch3',null,null) ");
//            System.out.println(changes);
//            showEtaty(conn);
//            conn.rollback();
//            changes = stmt.executeUpdate("insert into ETATY values ('oligarch3',null,null) ");
//            System.out.println(changes);
//            conn.commit();
//            showEtaty(conn);
            String[] nazwiska = {"Woźniak", "Dąbrowski", "Kozłowski"};
            int[] place = {1300, 1700, 1500};
            String[] etaty = {"ASYSTENT", "PROFESOR", "ADIUNKT"};

//
//            long start = System.nanoTime();
//            PreparedStatement pstmt = conn.prepareStatement(
//                    "INSERT INTO PRACOWNICY(ID_PRAC,NAZWISKO, ETAT,PLACA_POD)  VALUES (?,?,?,?)");
//            for (int i = 0; i < 2000; i++) {
//                pstmt.setInt(1, 1100 + i);
//                pstmt.setString(2, nazwiska[0]);
//                pstmt.setString(3, etaty[0]);
//                pstmt.setInt(4, place[0]);
//                pstmt.executeUpdate();
//            }
//            long end = System.nanoTime();
//            System.out.println("Po kolei :" + (end - start));
//            start = System.nanoTime();
//            for (int i = 0; i < 2000; i++) {
//                pstmt.setInt(1, 6100 + i);
//                pstmt.setString(2, nazwiska[0]);
//                pstmt.setString(3, etaty[0]);
//                pstmt.setInt(4, place[0]);
//                pstmt.addBatch();
//            }
//            pstmt.executeBatch();
//            end = System.nanoTime();
//            System.out.println("Razem :" + (end - start));
            CallableStatement stmt = conn.prepareCall(
                    "{? = call changeCase(?)}");
            stmt.setInt(2, 130);
            stmt.registerOutParameter(1, Types.VARCHAR);
            stmt.execute();
            int vLiczbaPracownikow = stmt.getInt(1);
////            Arrays.stream(zwolnienia).forEach(i -> {
//                try {
//                    changes.set(finalStmt.executeUpdate("DELETE FROM pracownicy WHERE id_prac=" + "i"
//                    ));
//                } catch (SQLException throwables) {
//                    throwables.printStackTrace();
//                }
//                System.out.println("Usunieto " + changes + " krotek.");
//            });
//            while (rs.next()) {
//                System.out.println(rs.getString(1));
//                System.out.println(rs.getInt(1) + " w zespole  " + rs.getString(2) + ",");
//            }
        } catch (SQLException ex) {
            System.out.println("Błąd wykonania polecenia: " + ex.getMessage());
        } finally {

            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException e) { /* kod obsługi */ }
            }
            if (rs1 != null) {
                try {
                    rs1.close();
                } catch (SQLException e) {
                }
            }
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException e) { /* kod obsługi */ }
            }
            if (conn != null) {
                connectionController.close();
            }
        }

    }
}
