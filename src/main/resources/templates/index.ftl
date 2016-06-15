<!DOCTYPE html>
<html>
<body>
    <div id="content">${content}</div>
    <script src="bundle.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            renderClient(${data});
        });
    </script>
</body>
</html>